import { History } from "history";
import React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import getRenderer from "psyche/components/renderers";
import { Dispatch, RootState } from "psyche/store";
import { Note } from "psyche/types/models";

import * as styles from "psyche/styles/note-details/root.scss";

export interface DispatchProps {
  updateNote: (note: Partial<Note>) => void;
  createNote: (note: Note) => void;
}

export interface StateProps {
  notes: Note[];
}

export interface OwnProps {
  match: any;
  history: History;
}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
  isEditing: boolean;
}

/**
 * This component encompasses the note detail view.
 *
 * It includes details about a single note, as well as the ability to
 * edit that note.
 */
class NoteDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isEditing: true
    };
  }

  public render() {
    const { match, notes } = this.props;
    const note = notes.find(x => x.id === +match.params.id);
    if (!note) {
      return <div>Loading...</div>;
    }
    return (
      <div className={styles.container}>
        {this.state.isEditing
          ? this.renderForm(note)
          : this.renderDisplay(note)}
      </div>
    );
  }

  private renderForm = (note: Note) => {
    const EditRenderer = getRenderer("").edit;
    return (
      <EditRenderer
        note={note}
        updateNote={this.props.updateNote}
        finishEditing={() => this.setState({ isEditing: false })}
      />
    );
  };

  private renderDisplay = (note: Note) => {
    const LongRenderer = getRenderer("").long;
    return <LongRenderer note={note} />;
    // return (
    //   <div className={styles.formContainer}>
    //     <h1>{note.title}</h1>
    //     <ReactMarkdown source={note.body} />
    //     <div>
    //       Children:
    //       {note.children
    //         ? note.children.map(childId => {
    //             const child = this.props.notes.find(n => n.id === childId);

    //             return child ? (
    //               <div key={childId}>
    //                 <Link to={`/note/${child.id}/`}>{child.title}</Link>
    //               </div>
    //             ) : null;
    //           })
    //         : null}
    //     </div>
    //     <button onClick={() => this.setState({ isEditing: true })}>Edit</button>
    //     <button onClick={() => this.duplicateNote()}>Duplicate</button>
    //   </div>
    // );
  };

  // Creates a copy using this note as a template.
  private duplicateNote = async () => {
    const note = this.props.notes.find(
      x => x.id === +this.props.match.params.id
    );
    if (!note) {
      return;
    }
    const newNote = (await this.props.createNote({
      body: note.body,
      id: -1,
      title: `${note.title} (Copy)`
    })) as any;
    // Update the children
    const currentChildren = note.children || [];
    this.props.updateNote({
      children: [...currentChildren, newNote.id],
      id: note.id
    });

    this.props.history.push(`/note/${newNote.id}/`);
  };
}

const mapState = (state: RootState): StateProps => ({
  notes: state.notes.notes
});

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({
  createNote: dispatch.notes.createNote,
  updateNote: dispatch.notes.updateNote
});

export default connect(
  mapState,
  mapDispatch
)(NoteDetails);
