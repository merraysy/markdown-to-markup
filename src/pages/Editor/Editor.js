import React, { Component } from 'react';

// components
import { EditorInput, EditorOutput, EditorDocumentsNav } from '../../components/Editor';

// css
import './Editor.css';

class Editor extends Component {
  render() {
    return (
      <main className="site-main">
        <div className="editor-wrapper container-fluid">
          <EditorDocumentsNav
            userDocs={this.props.userDocs}
            currentDoc={this.props.currentDoc}
            clickHandler={this.props.editDoc}
            togglePrivate={this.props.togglePrivate}
            downloadDoc={this.props.downloadDoc}
            deleteDoc={this.props.deleteDoc}
            createNewDoc={this.props.createNewDoc} />
          <EditorInput
            input={this.props.input}
            changeHandler={this.props.changeHandler}
            inputButtonsClickHandlers={this.props.inputButtonsClickHandlers} />
          <EditorOutput
            output={this.props.output} />
        </div>
      </main>
    );
  } // end-render
} // end-Editor

export default Editor;
