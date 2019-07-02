import { Note } from "psyche/types/models";

export interface RendererActions {
  goToNote: () => void; // Go to the note detail page.
  goToEditNote: () => void; // Go to the edit page for the note.
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

export interface EditRendererProps {
  updateNote: (updates: Partial<Note>) => void;
}
export interface EditRenderer
  extends React.FunctionComponent<CommonRendererProps & EditRendererProps> {}

export interface Renderer {
  short: ShortRenderer;
  long: LongRenderer;
  edit: EditRenderer;
}
