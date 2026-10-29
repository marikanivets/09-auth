'use client';

import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';
import { NotesClientProps } from '@/types/note';
import Link from 'next/link';

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  
  const lastToastQueryRef = useRef('');

  useEffect(() => {
    setPage(1);
    setSearchInput('');
    setSearchQuery('');
    lastToastQueryRef.current = '';
  }, [tag]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['notes', searchQuery, page, tag],
    queryFn: () => fetchNotes({ search: searchQuery, page, tag }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setSearchInput(nextValue);
    updateSearchQuery(nextValue);
  };

  useEffect(() => {
    if (!isFetching && !isError && searchQuery && notes.length === 0) {
      if (lastToastQueryRef.current !== searchQuery) {
        toast.error('No such note was found.');
        lastToastQueryRef.current = searchQuery;
      }
    }
    if (notes.length > 0) {
      lastToastQueryRef.current = '';
    }
  }, [isFetching, isError, searchQuery, notes.length]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearchChange} value={searchInput} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={newPage => setPage(newPage)}
            />
          )}

          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </header>

        {isFetching ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <p className={css.emptyMessage}>No notes found for this category.</p>
          )
        )}

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default NotesClient;

