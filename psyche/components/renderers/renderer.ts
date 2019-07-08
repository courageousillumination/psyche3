import { Note } from "psyche/types/models";

export interface RendererActions {
  // Navigation actions
  goToNote: (note: Note) => void; // Go to the note detail page.
  goToEditNote: (note: Note) => void; // Go to the edit page for the note.

  // Modification actions
  createNote: (note: Note) => void;
  updateNote: (updates: Partial<Note>) => void;
}

export interface CommonRendererProps {
  note: Note;
  children: Note[];
  actions: RendererActions;
}

export interface ShortRenderer
  extends React.FunctionComponent<CommonRendererProps> {}

export interface LongRenderer
  extends React.FunctionComponent<CommonRendererProps> {}

export interface EditRenderer
  extends React.FunctionComponent<CommonRendererProps> {}

export interface Renderer {
  short: ShortRenderer;
  long: LongRenderer;
  edit: EditRenderer;
}
