import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import Modal from '@/components/Modal/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModalNotePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modal isOpen={true} onClose={() => {}}>
        <NoteDetailsClient />
      </Modal>
    </HydrationBoundary>
  );
}
