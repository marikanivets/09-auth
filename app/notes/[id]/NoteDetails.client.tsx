'use client';

import css from './NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
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

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
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
  );
};

export default NoteDetailsClient;