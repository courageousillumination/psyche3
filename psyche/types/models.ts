export interface Note {
  children?: number[];
  color?: string;
  title: string;
  body?: string;
  noteType?: string;
  id: number;
}

export interface NoteActions {
  goTo: (noteId: number, edit: boolean) => void;
  create: (note: Partial<Note>) => void;
  update: (note: Partial<Note>) => void;
  delete: (note: Note) => void;
}
