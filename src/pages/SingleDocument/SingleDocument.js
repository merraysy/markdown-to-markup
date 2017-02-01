import React, { Component } from 'react';

// components
import { Document } from '../../components/Document';

class SingleDocument extends Component {
  componentWillMount() {
    if (!this.props.currentDocument) {
      this.props.viewSingleDocument(this.props.params.id);
    }
  } // end-componentWillMount

  render() {
    return (
      <main className="site-main container">
        {
          (this.props.currentDocument)
          ? <Document
            document={this.props.currentDocument} />
          : ''
        }
      </main>
    );
  } // end-render
} // end-SingleDocument

export default SingleDocument;
