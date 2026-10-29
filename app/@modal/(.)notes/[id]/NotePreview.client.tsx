'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const close = () => {
    router.back();
  };

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={close}>
        <p>loading...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal isOpen={true} onClose={close}>
        <p>Note not found.</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={close}>
      <main className={css.main}>
        <h1 className={css.title}>{note.title}</h1>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
      </main>
    </Modal>
  );
}
