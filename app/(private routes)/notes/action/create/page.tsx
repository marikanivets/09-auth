import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import css from './CreateNote.module.css';

const NoteForm = dynamic(() => import('@/components/NoteForm/NoteForm'), {
  ssr: false, 
});

const BASE_URL = 'https://vercel.app';

export const metadata: Metadata = {
  title: 'Create new note | NoteHub',
  description: 'A simple and efficient app for creating and organizing your notes',
  openGraph: {
    title: 'Create new note | NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes',
    url: `${BASE_URL}/notes/action/create`,
    images: [
      {
        url: `${BASE_URL}/notes/action/create/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Create new note | NoteHub',
      },
    ],
  },
  twitter: {
    title: 'Create new note | NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes',
    images: [`${BASE_URL}/notes/action/create/og-image.png`],
  },
};

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


