import * as styles from "psyche/styles/import-export-area.scss";
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
      <div className={styles.container}>
        <textarea
          className={styles.importTextArea}
          value={this.state.textAreaValue}
          onChange={this.handleTextAreaChange}
        />
        <div className={styles.buttonContainer}>
          <div>
            <button onClick={this.handleImport} data-test="import">
              Import
            </button>
          </div>
          <div>
            <button onClick={this.handleExport} data-test="export">
              Export
            </button>
          </div>
        </div>
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
