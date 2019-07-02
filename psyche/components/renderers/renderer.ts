import { Note } from "psyche/types/models";

export interface CommonRendererProps {
  note: Note;
}

export interface ShortRendererProps {
  navigateToNote: (id: number) => void;
}
export interface ShortRenderer
  extends React.FunctionComponent<CommonRendererProps & ShortRendererProps> {}

export interface LongRenderer
  extends React.FunctionComponent<CommonRendererProps> {}

export interface EditRendererProps {
  updateNote: (updates: Partial<Note>) => void;
  finishEditing: () => void;
}
export interface EditRenderer
  extends React.FunctionComponent<CommonRendererProps & EditRendererProps> {}

export interface Renderer {
  short: ShortRenderer;
  long: LongRenderer;
  edit: EditRenderer;
}
