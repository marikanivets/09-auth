import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from '@/lib/api/serverApi';

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  const isPrivateRoute = privateRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSessionServer();
      
      let nextResponse = NextResponse.next();
      if (isPublicRoute) {
        nextResponse = NextResponse.redirect(new URL("/", request.url));
      } else if (isPrivateRoute) {
        nextResponse = NextResponse.next();
      }

      const rawHeaders = response.headers as any;
      let setCookieHeaders: string | string[] | null = null;

      if (rawHeaders) {
        if (typeof rawHeaders.getSetCookie === 'function') {
          setCookieHeaders = rawHeaders.getSetCookie();
        } else if (typeof rawHeaders.get === 'function') {
          setCookieHeaders = rawHeaders.get('set-cookie');
        } else if (rawHeaders['set-cookie']) {
          setCookieHeaders = rawHeaders['set-cookie'];
        }
      }
      
      if (setCookieHeaders) {
        if (Array.isArray(setCookieHeaders)) {
          setCookieHeaders.forEach((cookieStr) => {
            nextResponse.headers.append('set-cookie', cookieStr);
          });
        } else {
          nextResponse.headers.append('set-cookie', String(setCookieHeaders));
        }
      }

      return nextResponse;
    } catch (error) {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

