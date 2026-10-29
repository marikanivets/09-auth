'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
      <p>Could not fetch note details. {error.message}</p>
      <button 
        onClick={() => reset()} 
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}
