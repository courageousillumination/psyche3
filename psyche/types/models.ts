export interface Relationship {
  id: number;
  source: number;
  destination: number;
  relationshipType: string;
}

export interface Note {
  relationshipsSource?: Relationship[];
  relationshipsDest?: Relationship[];
  color?: string;
  title: string;
  body?: string;
  noteType?: string;
  id: number;
}

export interface NoteActions {
  goTo: (noteId: number, edit?: boolean) => void;
  create: (note: Partial<Note>) => void;
  update: (note: Partial<Note>) => void;
  delete: (note: Note) => void;
  createRelationship: (source: number, dest: number, type: string) => void;
  deleteRelationship: (id: number) => void;
}
