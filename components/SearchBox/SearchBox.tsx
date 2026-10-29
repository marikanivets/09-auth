// src/components/SearchBox/SearchBox.tsx
'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className={css.wrap}>
      <input
        type="text"
        className={css.input}
        placeholder="Search notes by title or tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}