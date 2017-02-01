import { addKeys } from '../../utils';
import React, { Component } from 'react';

// components
import { DocumentCol } from '../../components/Document';

// css
import './BrowseDocuments.css';

class BrowseDocuments extends Component {
  render() {
    const publicDocs = this.props.publicDocs.map((doc) => {
      return <DocumentCol document={doc} />
    });

    return (
      <main className="site-main container">
        <div className="documents row">
          {addKeys(publicDocs)}
        </div>
      </main>
    );
  } // end-render
} // end-BrowseDocuments

export default BrowseDocuments;
