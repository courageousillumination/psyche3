import React from "react";
import { connect } from "react-redux";

import { Note } from "psyche/types/models";
import { RootState, Dispatch } from "psyche/store";

export interface StateProps {
  storeNotes: Note[];
}

export interface DispatchProps {
  dispatch: Dispatch;
}

export interface OwnProps {
  notes?: number[];
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface WrappedProps {
  notes: Note[];
  actions: any;
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
      const actions = {
        createNote: this.props.dispatch.notes.createNote
      };
      return <WrappedComponent notes={loadedNotes} actions={actions} />;
    };

    private loadIfNecessary = () => {
      if (!this.props.notes) {
        return;
      }
      if (this.getNoteObjects().length == this.props.notes.length) {
        // This isn't the right check, but it'll do for now.
        return;
      }
      this.props.dispatch.notes.loadNotes();
    };

    private getNoteObjects = () => {
      return this.props.notes
        ? this.props.storeNotes.filter(
            note => (this.props.notes || []).indexOf(note.id) >= 0
          )
        : [];
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
  )(wrapper);
}

export default withNoteLoader;
