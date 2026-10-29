import { apiInstance } from './api';

export async function fetchNotesServer(cookiesHeader?: string) {
  const { data } = await apiInstance.get('/notes', {
    headers: cookiesHeader ? { Cookie: cookiesHeader } : {},
  });
  return data;
}

export async function fetchNoteByIdServer(id: string, cookiesHeader?: string) {
  const { data } = await apiInstance.get(`/notes/${id}`, {
    headers: cookiesHeader ? { Cookie: cookiesHeader } : {},
  });
  return data;
}

export async function getMeServer(cookiesHeader?: string) {
  const { data } = await apiInstance.get('/users/me', {
    headers: cookiesHeader ? { Cookie: cookiesHeader } : {},
  });
  return data;
}

export async function checkSessionServer(cookiesHeader?: string) {
  const { data } = await apiInstance.get('/auth/session', {
    headers: cookiesHeader ? { Cookie: cookiesHeader } : {},
  });
  return data;
}
