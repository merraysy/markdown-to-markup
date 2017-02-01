import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer container-fluid text-center">
        <p>made with <i className="fa fa-heart-o"></i> by folks at <a href="https://hiddenfounders.com" target="_blank">Hidden Founders</a></p>
      </footer>
    );
  } // end-render
} // end-Footer

export default Footer;
