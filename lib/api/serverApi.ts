import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
  
  return cookieString ? { Cookie: cookieString } : {};
}

export async function fetchNotesServer(search?: string, page?: number, tag?: string): Promise<any> {
  const headers = await getAuthHeaders();
  const { data } = await api.get('/notes', {
    headers,
    params: {
      search: search || undefined,
      page: page || 1,
      tag: tag && tag !== 'all' ? tag : undefined,
    },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
}

export async function getMeServer(): Promise<User> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>('/users/me', { headers });
  return data;
}

export async function checkSessionServer() {
  const headers = await getAuthHeaders();
  return await api.get('/auth/session', { headers });
}
