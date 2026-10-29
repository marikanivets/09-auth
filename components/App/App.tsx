import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteList from '@/components/NoteList/NoteList';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['notes', searchQuery, page],
    queryFn: () => fetchNotes(searchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = Array.isArray(data) ? data : [];
  const totalPages = 1;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    updateSearchQuery(value);
  };

  useEffect(() => {
    if (!isFetching && !isError && searchQuery && notes.length === 0) {
      toast.error('No such note was found.');
    }
  }, [isFetching, isError, searchQuery, notes.length]);

  return (
    <>
      <div>
        <header>
          {}
          <SearchBox onChange={handleSearchChange} value={searchInput} />
          
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page} 
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </header>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}

        <button onClick={openModal}>
          Create note +
        </button>

        {isFetching ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          notes.length > 0 && <NoteList notes={notes} />
        )}
      </div>
      <Toaster />
    </>
  );
}
