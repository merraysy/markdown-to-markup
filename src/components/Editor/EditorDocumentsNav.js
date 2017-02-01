import { addKeys } from '../../utils';
import React, { Component } from 'react';

// components
import { EditorDocumentsNavLi } from './';

// css
import './EditorDocumentsNav.css';

class EditorDocumentsNav extends Component {
  render() {
    const userDocsNavListItems = this.props.userDocs.map((userDoc) => {
      return <EditorDocumentsNavLi
        document={userDoc}
        currentDoc={this.props.currentDoc}
        togglePrivate={this.props.togglePrivate}
        downloadDoc={this.props.downloadDoc}
        deleteDoc={this.props.deleteDoc}
        clickHandler={this.props.clickHandler} />
    });

    return (
      <div className="documents-nav col-md-2">
        {
          (userDocsNavListItems.length === 0)
          ? <p className="message text-center">You have no documents yet.</p>
          : ''
        }
        <ul className="nav nav-pills nav-stacked">
          {addKeys(userDocsNavListItems)}
          <li className="new-document text-center">
            <button className="btn btn-success btn-sm" onClick={this.props.createNewDoc}>
              <i className="fa fa-plus"></i>
              New Document
            </button>
          </li>
        </ul>
      </div>
    );
  } // end-render
} // end EditorDocumentsNav

export default EditorDocumentsNav;
