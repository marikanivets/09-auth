import { cookies } from 'next/headers';
import { api } from '@/app/api/api'; 
import type { Note } from '@/types/note'; 
import type { User } from '@/types/user'; 

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
  
  if (cookieString) {
    config.headers.Cookie = cookieString;
  }
  
  return config;
});


export async function fetchNotesServer(): Promise<Note[]> {
  const { data } = await api.get<Note[]>('/notes');
  return data;
}


export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}


export async function getMeServer(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}


export async function checkSessionServer() {
  const response = await api.get('/auth/session');
  return response;
}
