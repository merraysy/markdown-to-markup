import React, { Component } from 'react';

class Document extends Component {
  render() {
    const { title, lastEdited, text } = this.props.document;
    const { username } = this.props.document.user;

    return (
      <div className="document">
        <h3>{title}</h3>
        <h5>By <i>{username}</i>, Last edited at <i>{lastEdited}</i></h5>
        <p>{text}</p>
      </div>
    );
  } // end-render
} // end-Document

export default Document;
