// app/notes/[id]/page.tsx
import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);

    const title = note?.title ? `Notes - ${note.title}` : 'Note Details | NoteHub';
    const description = note?.content ? `${note.content.slice(0, 150)}...` : 'View note details.';
    const noteId = note?.id || id;
    
    const pageUrl = `https://notehub.com/notes/${noteId}`;
    const ogImageUrl = `${pageUrl}/og-image.png`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: pageUrl,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        title,
        description,
        images: [ogImageUrl], 
      },
    };
  } catch (error) {
    return {
      title: 'Note Details | NoteHub',
      description: 'View note details.',
    };
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  // Безопасный prefetch на сервере
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
