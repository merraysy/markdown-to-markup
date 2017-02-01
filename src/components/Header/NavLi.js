import React, { Component } from 'react';

// components
import { NavButton } from './';

class NavLi extends Component {
  render() {
    return (
      <li>
        <NavButton
          link={this.props.link}
          type={this.props.type}
          value={this.props.value}
          clickHandler={this.props.clickHandler} />
      </li>
    );
  } // end-render
} // end-NavLi

export default NavLi;
