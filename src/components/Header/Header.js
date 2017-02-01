import { Link } from 'react-router';
import React, { Component } from 'react';

// css
import './Header.css';

// components
import { Nav } from './';
import Spinner from '../Spinner';

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">markdown^</Link>
            </div>
            <Nav
              user={this.props.user}  />
          </div>
        </nav>

        {
          (this.props.spinner && this.props.spinner.spinning)
          ? <Spinner text={this.props.spinner.text} />
          : ''
        }
      </header>
    );
  } // end-render
} // end-Header

export default Header;
