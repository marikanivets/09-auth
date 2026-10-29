'use client';

import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

const NotePreviewClient = ({ id }: Props) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const close = () => router.back();

  if (isLoading)
    return (
      <Modal onClose={close}>
        <p>Loading...</p>
      </Modal>
    );
  if (error || !note)
    return (
      <Modal onClose={close}>
        <p>Note not found.</p>
      </Modal>
    );

  return (
    <Modal onClose={close}>
      <main className={css.main}>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default NotePreviewClient;