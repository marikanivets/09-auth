// app/notes/filter/[...slug]/page.tsx
import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const BASE_URL = 'https://vercel.app';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const note = slug && slug.length > 0 ? slug[0] : 'all';

  const formattedTitle = `Notes - ${note.charAt(0).toUpperCase() + note.slice(1)}`;
  
  const pageUrl = `${BASE_URL}/notes/filter/${note}`;
  const ogImageUrl = `${pageUrl}/og-image.png`;

  return {
    title: formattedTitle,
    description: `Browse notes tagged with ${note}. NoteHub allows you to filter and view notes based on specific tags.`,
    openGraph: {
      title: formattedTitle,
      description: `Browse notes tagged with ${note}. NoteHub allows you to filter and view notes based on specific tags.`,
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${note} | NoteHub`,
        },
      ],
    },
    twitter: {
      title: formattedTitle,
      description: `Browse notes tagged with ${note}. NoteHub allows you to filter and view notes based on specific tags.`,
      images: [ogImageUrl], 
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  
  const category = slug && slug.length > 0 ? slug[0] : '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, category],
    queryFn: () => fetchNotes({ search: '', page: 1, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {}
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
