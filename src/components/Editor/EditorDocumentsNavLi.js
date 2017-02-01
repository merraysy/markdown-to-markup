import React, { Component } from 'react';

class EditorDocumentsNavLi extends Component {
  render() {
    const { id, title, isPrivate } = this.props.document;
    const activeClass = this.props.currentDoc && this.props.currentDoc.id === id ? 'active' : '';
    const clickHandler = (e) => {
      e.preventDefault();
      this.props.clickHandler(id);
    };
    const togglePrivate = (e) => {
      e.preventDefault();
      this.props.togglePrivate();
    };
    const downloadDoc = (e) => {
      e.preventDefault();
      this.props.downloadDoc();
    };
    const deleteDoc = (e) => {
      e.preventDefault();
      this.props.deleteDoc(id);
    };

    return (
      <li className={activeClass}>
        <a href="" onClick={clickHandler}>
          {title}
          {(isPrivate) ? <span className="badge">Private</span> : ''}
          <ul className="document-actions">
            <li>
              <a href="" className="text-toggle-private" onClick={togglePrivate}>
                <i className={(isPrivate) ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                <span className="mm-tooltip">toggle private</span>
              </a>
            </li>
            <li>
              <a href="" className="text-download" onClick={downloadDoc}>
                <i className="fa fa-download"></i>
                <span className="mm-tooltip">download</span>
              </a>
            </li>
            <li>
              <a href="" className="text-danger" onClick={deleteDoc}>
                <i className="fa fa-times"></i>
                <span className="mm-tooltip">delete</span>
              </a>
            </li>
          </ul>
        </a>
      </li>
    );
  } // end-render
} // end-EditorDocumentsNavLi

export default EditorDocumentsNavLi;
