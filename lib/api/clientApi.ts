import { apiInstance } from './api';

// Заметки (Client Side)
export async function fetchNotes(search = '', page = 1, tag = 'all') {
  const { data } = await apiInstance.get('/notes', {
    params: { search, page, perPage: 12, tag },
  });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await apiInstance.get(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: { title: string; content: string; tag: string }) {
  const { data } = await apiInstance.post('/notes', noteData);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await apiInstance.delete(`/notes/${id}`);
  return data;
}

// Авторизация (Client Side)
export async function register(userData: Record<string, string>) {
  const { data } = await apiInstance.post('/auth/register', userData);
  return data;
}

export async function login(userData: Record<string, string>) {
  const { data } = await apiInstance.post('/auth/login', userData);
  return data;
}

export async function logout() {
  await apiInstance.post('/auth/logout');
}

export async function checkSession() {
  const { data } = await apiInstance.get('/auth/session');
  return data;
}

export async function getMe() {
  const { data } = await apiInstance.get('/users/me');
  return data;
}

export async function updateMe(userData: Record<string, string>) {
  const { data } = await apiInstance.patch('/users/me', userData);
  return data;
}
