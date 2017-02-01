import React, { Component } from 'react';

class EditorOutput extends Component {
  render() {
    const { output } = this.props;
    const createOutput = (output) => {
      return { __html: output };
    };
    return (
      <div className="preview col-md-5">
        <div id="output" className="output container" dangerouslySetInnerHTML={createOutput(output)}></div>
      </div>
    );
  } // end-render
} // end-EditorOutput

export default EditorOutput;
