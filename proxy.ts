import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const response = await checkSessionServer();
        
        let nextResponse = NextResponse.next();
        if (isPublicRoute) {
          nextResponse = NextResponse.redirect(new URL("/", request.url));
        } else if (isPrivateRoute) {
          nextResponse = NextResponse.next();
        }

        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
          setCookieHeader.forEach((cookieStr) => {
            nextResponse.headers.append('set-cookie', cookieStr);
          });
        }

        return nextResponse;
      } catch (error) {
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

