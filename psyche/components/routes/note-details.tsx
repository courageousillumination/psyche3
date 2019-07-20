import React from "react";
import { RouteComponentProps } from "react-router-dom";

import NoteEditRenderer from "psyche/components/note-edit-renderer";
import NoteLongRenderer from "psyche/components/note-long-renderer";

export interface MatchParams {
  id: string;
  edit: string;
}

export type Props = RouteComponentProps<MatchParams>;

const NoteDetails: React.FunctionComponent<Props> = ({ match }) => {
  const noteId = +match.params.id;
  const isEditing = !!match.params.edit;
  return isEditing ? (
    <NoteEditRenderer notes={[noteId]} />
  ) : (
    <NoteLongRenderer notes={[noteId]} />
  );
};
export default NoteDetails;
