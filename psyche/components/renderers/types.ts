import { Note, NoteActions } from "psyche/types/models";

export interface Props {
  note: Note;
  actions: NoteActions;
}
export type Renderer = React.FunctionComponent<Props>;

export interface RendererGroup {
  short: Renderer;
  long: Renderer;
  edit: Renderer;
}
