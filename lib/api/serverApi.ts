import { cookies } from 'next/headers';
import axios from 'axios';

const serverApiInstance = axios.create({
  baseURL: 'https://goit.global',
});

serverApiInstance.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
  
  if (cookieString) {
    config.headers.Cookie = cookieString;
  }
  
  return config;
});

export async function fetchNotesServer() {
  const { data } = await serverApiInstance.get('/notes');
  return data;
}

export async function fetchNoteByIdServer(id: string) {
  const { data } = await serverApiInstance.get(`/notes/${id}`);
  return data;
}

export async function getMeServer() {
  const { data } = await serverApiInstance.get('/users/me');
  return data;
}

export async function checkSessionServer() {
  const response = await serverApiInstance.get('/auth/session');
  return response;
}
