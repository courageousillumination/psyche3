import React from "react";

export interface Props {
  notes: string[];
  setNotes: (notes: string[]) => void;
}

export interface State {
  textAreaValue: string;
}

class ImportExportArea extends React.Component<Props, State> {
  public state = {
    textAreaValue: ""
  };

  public render() {
    return (
      <div>
        <textarea
          value={this.state.textAreaValue}
          onChange={this.handleTextAreaChange}
        />
        <button onClick={this.handleImport} data-test="import">
          Import
        </button>
        <button onClick={this.handleExport} data-test="export">
          Export
        </button>
      </div>
    );
  }

  private handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      textAreaValue: event.target.value
    });
  };

  private handleImport = () => {
    const decoded = JSON.parse(this.state.textAreaValue);
    this.props.setNotes(decoded.notes);
  };

  private handleExport = () => {
    this.setState({
      textAreaValue: JSON.stringify({ notes: this.props.notes })
    });
  };
}

export default ImportExportArea;
