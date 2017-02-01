import { addKeys } from '../../utils';
import { Link } from 'react-router';
import React, { Component } from 'react';

// css
import './Hero.css';

class Hero extends Component {
  render() {
    const userButtons = [
      <Link
        to="/documents"
        className="btn btn-success btn-lg text-uppercase">browse documents</Link>
    ];

    const guestButtons = [
      <Link
        to="/auth/register"
        className="btn btn-primary btn-lg text-uppercase">signup now</Link>
    ];

    return (
      <div className="site-hero jumbotron">
        <div className="container text-center">
          <h1 className="title text-uppercase">Markdown to Markup</h1>
          <p className="lead">A free web text editor that supports <em>markdown</em>.</p>
          {
            (this.props.user)
            ? addKeys(userButtons)
            : addKeys(guestButtons)
          }
        </div>
      </div>
    );
  } // end-render
} // end-Hero

export default Hero;
