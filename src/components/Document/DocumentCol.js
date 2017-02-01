import { Link } from 'react-router';
import React, { Component } from 'react';

class DocumentCol extends Component {
  render() {
    const { id, title, lastEdited, text } = this.props.document;
    const { username } = this.props.document.user;
    
    return (
      <div className="document col-lg-4 col-md-6 col-sm-12">
        <Link to={`/documents/${id}`}><h3>{(title) ? title : 'no title' }</h3></Link>
        <h5>By <i>{username}</i>, Last edited at <i>{lastEdited}</i></h5>
        <p>{text}</p>
      </div>
    );
  } // end-render
} // end-DocumentCol

export default DocumentCol;
