import React from "react";
import { connect } from "react-redux";

import { Dispatch, RootState } from "psyche/store";

export interface ComponentProps {
  notes: number[];
}

export interface StateProps {
  queries: { [index: string]: number[] };
}

export interface DispatchProps {
  dispatch: Dispatch;
}

export interface OwnProps {
  query: string;
  component: any;
}

export type Props = StateProps & DispatchProps & OwnProps;

class QueryLoader extends React.Component<Props> {
  public componentDidMount = () => {
    this.loadQuery();
  };

  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.query !== this.props.query) {
      this.loadQuery();
    }
  };

  public render = () => {
    const Component = this.props.component;
    const queryResults = this.props.queries[this.props.query] || [];
    console.log(this.props.queries);
    return <Component notes={queryResults} />;
  };

  private loadQuery = () => {
    this.props.dispatch.queries.runQuery(this.props.query);
  };
}

const mapState = (state: RootState): StateProps => ({
  queries: state.queries.queries
});

const mapDispatch: (dispatch: any) => DispatchProps = (
  dispatch: Dispatch
): DispatchProps => ({ dispatch });

export default connect(
  mapState,
  mapDispatch
)(QueryLoader);
