export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  tag: NoteTag;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteInput {
  title: string;
  tag: NoteTag;
  content: string;
}

