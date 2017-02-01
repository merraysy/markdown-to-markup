import { addKeys } from '../../utils';
import { Link } from 'react-router';
import React, { Component } from 'react';

// components
import { DocumentCol } from './';

class LatestPublicDocuments extends Component {
  render() {
    const latestPublicDocs = this.props.latestPublicDocs.map((doc) => {
      return <DocumentCol document={doc} />;
    });

    return (
      <main className="site-main container">
        <div className="title row text-center">
          <h2>Latest public documents</h2>
        </div>

        <div className="latest-documents row">
          {addKeys(latestPublicDocs)}
        </div>

        <div className="browse-link row text-center text-capitalize">
          <Link to="/documents" className="btn btn-primary">browse documents</Link>
        </div>
      </main>
    );
  } // end-render
} // end-LatestPublicDocuments

export default LatestPublicDocuments;
