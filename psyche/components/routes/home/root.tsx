// import { History } from "history";
import React from "react";
// import { connect } from "react-redux";

// import { getActions } from "psyche/components/renderers";
// import NewNoteForm from "psyche/components/routes/home/new-note-form";
// import NotesDisplay from "psyche/components/routes/home/notes-display";
// import LoadingIndicator from "psyche/components/shared/loading-indicator";
// import { Dispatch, RootState } from "psyche/store";
import QueryLoader from "psyche/components/containers/query-loader";
import NoteList from "psyche/components/note-list";
import NewNoteForm from "psyche/components/forms/new-note-form";

// export interface DispatchProps {
//   dispatch: Dispatch;
// }

// export interface StateProps {
//   notes: Note[];
//   isLoading: boolean;
// }

// export interface OwnProps {
//   history: History;
// }

// export type Props = DispatchProps & StateProps & OwnProps;

// /**
//  * This is the root component for our home route.
//  * It gives the user a quick view into all of their notes and allows them to
//  * explore specific notes more in depth.
//  */
// export const Home: React.FunctionComponent<Props> = ({
//   dispatch,
//   notes,
//   isLoading,
//   history
// }) => {
//   return (
//     <div>
//       <NewNoteForm createNote={dispatch.notes.createNote} />
//       {isLoading && !notes.length ? (
//         <LoadingIndicator />
//       ) : (
//         <NotesDisplay notes={notes} actions={getActions(history, dispatch)} />
//       )}
//     </div>
//   );
// };

// const mapDispatch: (dispatch: any) => DispatchProps = (
//   dispatch: Dispatch
// ): DispatchProps => ({ dispatch });

// const mapState = (state: RootState): StateProps => ({
//   isLoading: state.notes.isLoading,
//   notes: state.notes.notes
// });

// export default connect(
//   mapState,
//   mapDispatch
// )(Home);

// export interface Props {
//   notes: Note[];
// }

// const testNoteLoader: React.FunctionComponent<Props> = ({ notes }) => {
//   return (
//     <div>
//       {notes.map((note, i) => (
//         <div key={i}>{note.title}</div>
//       ))}
//     </div>
//   );
// };

// export default withNoteLoader(testNoteLoader);

const Home = () => {
  return (
    <div>
      <NewNoteForm />
      <QueryLoader query={"foobar"} component={NoteList} />
    </div>
  );
};

export default Home;
