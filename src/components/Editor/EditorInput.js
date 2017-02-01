import { addKeys } from '../../utils';
import React, { Component } from 'react';
import AceEditor from 'react-ace';

// ace modules
import 'brace/mode/markdown';
import 'brace/theme/twilight';

// components
import { EditorButton } from './';

// css
import './EditorInput.css';

class EditorInput extends Component {
  render() {
    const editorButtons = [
      <EditorButton
        id="toggle-nav"
        icon="window-maximize"
        value="hide nav"
        clickHandler={this.props.inputButtonsClickHandlers.toggleNav} />,
      <EditorButton
        id="toggle-preview"
        icon="window-close-o"
        value="hide preview"
        clickHandler={this.props.inputButtonsClickHandlers.togglePreview} />
    ];
    const changeHandler = (nVal) => {
      this.props.changeHandler({
        text: nVal
      });
    };

    return (
      <div className="editor col-md-5">
        {
          (this.props.input !== null)
          ? <div className="active-state">
              <AceEditor
                mode="markdown"
                theme="twilight"
                onChange={changeHandler}
                name="input"
                className="input container"
                height="100%"
                width="100%"
                fontSize={18}
                highlightActiveLine={false}
                showGutter={false}
                value={this.props.input}
                editorProps={{
                  $blockScrolling: true
                }} />

              <ul className="options list-unstyled text-right">
                {addKeys(editorButtons)}
              </ul>
            </div>
          : <div className="inactive-state">
              <p className="lead text-center">Plaese create a new Document or select one to edit.</p>
            </div>
        }
      </div>
    );
  } // end-render
} // end-EditorInput

export default EditorInput;
