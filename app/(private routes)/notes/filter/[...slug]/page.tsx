import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotesServer } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = slug && slug[0] ? decodeURIComponent(slug[0]) : "all";

  return {
    title: `Notes - ${note}`,
    description: `Browse notes tagged with ${note}. Notehub allows you to filter and view notes based on specific tags`,
    openGraph: {
      title: `Notes - ${note}`,
      description: `Browse notes tagged with ${note}. Notehub allows you to filter and view notes based on specific tags`,
      url: `https://notehub.com{note}`,
      images: [
        {
          url: "https://goit.global",
          width: 1200,
          height: 630,
          alt: `Notes ${note} | NoteHub`,
        },
      ],
    },
    twitter: {
      title: `Notes - ${note}`,
      description: `Browse notes tagged with ${note}. Notehab allows you to filter and view notes based on specific tags`,
      images: ["https://goit.global"],
    },
  };
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : "all";

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotesServer(undefined, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}



