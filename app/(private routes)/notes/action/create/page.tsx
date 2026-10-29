'use client';

import dynamic from 'next/dynamic';
import css from './CreateNote.module.css';

const NoteForm = dynamic(() => import('@/components/NoteForm/NoteForm'), {
  ssr: false,
});

const BASE_URL = 'https://vercel.app';

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* Компонент отрендерится безопасно сразу на стороне клиента */}
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;

