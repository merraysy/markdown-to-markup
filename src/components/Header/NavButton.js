import { Link } from 'react-router';
import React, { Component } from 'react';

class NavButton extends Component {
  render() {
    return (
      <Link
        to={this.props.link}
        activeClassName="active"
        className={`btn btn-${this.props.type}`}
        onClick={this.props.clickHandler}>{this.props.value}</Link>
    );
  } // end-render
} // end-NavButton

export default NavButton;
