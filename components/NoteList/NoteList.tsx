// src/components/NoteList/NoteList.tsx
'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (notes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <div className={css.meta}>
            <span className={css.tag}>#{note.tag}</span>
            <span className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</span>
          </div>
          <h2 className={css.noteTitle}>{note.title}</h2>
          <p className={css.excerpt}>
            {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
          </p>
          <div className={css.actions}>
            {}
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>
            <button
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
              className={css.deleteBtn}
            >
              {mutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
