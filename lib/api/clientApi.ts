import { api } from '@/app/api/api';
// ИСПРАВЛЕНИЕ TASK 12: Импортируем готовые интерфейсы из центрального модуля типов проекта
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(search = '', page = 1, tag = 'all'): Promise<ApiResponse> {
  const { data } = await api.get<ApiResponse>('/notes', {
    params: {
      search: search || undefined,
      page,
      perPage: 12,
      tag: tag && tag !== 'all' ? tag : undefined,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: CreateNoteInput): Promise<Note> {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
}

// ИСПРАВЛЕНИЕ TASK 12: Функция теперь возвращает удаленную заметку (Promise<Note>) вместо void
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function register(userData: Omit<User, 'id'> & Record<string, string>): Promise<{ user: User }> {
  const { data } = await api.post('/auth/register', userData);
  return data;
}

export async function login(userData: Record<string, string>): Promise<{ user: User }> {
  const { data } = await api.post('/auth/login', userData);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<{ user: User }> {
  const { data } = await api.get('/auth/session');
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(userData: Partial<Omit<User, 'id'>> & Record<string, string>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', userData);
  return data;
}
