import React, { Component } from 'react';

import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <span className="spinner">
        <i className="fa fa-spinner"></i>
        <span className="text">{this.props.text}...</span>
      </span>
    );
  } // end-render
} // end-Spinner

export default Spinner;
