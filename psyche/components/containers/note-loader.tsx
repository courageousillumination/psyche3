import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { Dispatch, RootState } from "psyche/store";
import { Note, NoteActions } from "psyche/types/models";

export interface StateProps {
  storeNotes: Note[];
}

export interface DispatchProps {
  dispatch: Dispatch;
}

export interface OwnProps {
  notes?: number[];
}

export type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps;

export interface WrappedProps {
  notes: Note[];
  actions: NoteActions;
}

function withNoteLoader(
  WrappedComponent: React.FunctionComponent<WrappedProps>
) {
  const wrapper = class extends React.Component<Props> {
    public componentDidMount = () => {
      this.loadIfNecessary();
    };

    public componentDidUpdate = (prevProps: Props) => {
      if (prevProps.notes !== this.props.notes) {
        this.loadIfNecessary();
      }
    };

    public render = () => {
      const loadedNotes = this.getNoteObjects();
      return this.needsLoad() ? (
        <div>Loading...</div>
      ) : (
        <WrappedComponent notes={loadedNotes} actions={this.getNoteActions()} />
      );
    };

    private loadIfNecessary = () => {
      if (this.needsLoad()) {
        this.props.dispatch.notes.loadNotes();
      }
    };

    private needsLoad = () => {
      return (
        this.props.notes &&
        this.getNoteObjects().length !== this.props.notes.length
      );
    };

    private getNoteObjects = () => {
      return this.props.notes
        ? this.props.storeNotes.filter(
            note => (this.props.notes || []).indexOf(note.id) >= 0
          )
        : [];
    };

    private getNoteActions = (): NoteActions => {
      return {
        create: this.props.dispatch.notes.createNote,
        delete: note => this.props.dispatch.notes.deleteNote(note.id),
        goTo: (noteId, edit = false) => {
          this.props.history.push(`/note/${noteId}/${edit ? "edit" : ""}`);
        },
        update: this.props.dispatch.notes.updateNote,
        createRelationship: (
          source: number,
          dest: number,
          relationshipType: string
        ) => {
          this.props.dispatch.notes.createRelationship({
            source: source,
            destination: dest,
            relationshipType
          });
        },
        deleteRelationship: this.props.dispatch.notes.deleteRelationship
      };
    };
  };

  const mapState = (state: RootState): StateProps => ({
    storeNotes: state.notes.notes
  });

  const mapDispatch: (dispatch: any) => DispatchProps = (
    dispatch: Dispatch
  ): DispatchProps => ({ dispatch });

  return connect(
    mapState,
    mapDispatch
  )(withRouter(wrapper));
}

export default withNoteLoader;
