import React, { Component } from 'react';

// components
import { LatestPublicDocuments } from '../../components/Document';
import Hero from '../../components/Hero';

// css
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <Hero
          user={this.props.user} />

        {
          (this.props.user)
          ? <LatestPublicDocuments latestPublicDocs={this.props.latestPublicDocs} />
          : ''
        }
      </div>
    );
  } // end-render
} // end-Landing

export default Landing;
