import React, { Component } from 'react';

class EditorButton extends Component {
  render() {
    const { id, icon, value } = this.props;
    return (
      <li>
        <button id={id} className="btn btn-default btn-sm" onClick={this.props.clickHandler}>
          <i className={`fa fa-${icon}`}></i>
          <span className="text">{value}</span>
        </button>
      </li>
    );
  } // end-render
} // end-EditorButton

export default EditorButton;
