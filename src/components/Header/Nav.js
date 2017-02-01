import { addKeys } from '../../utils';
import React, { Component } from 'react';

// actions
import { UserActions } from '../../actions';

// components
import { NavLi } from './';

class Nav extends Component {
  logout() {
    UserActions.logout();
  } // end-logout

  render() {
    const guestListItems = [
      <NavLi key="1" link="/auth/login" type="primary" value="login" />
    ];

    const userListItems = [
      <NavLi key="1" link="/documents" type="default" value="browse documents" />,
      <NavLi key="1" link="/editor" type="success" value="my documents" />,
      <NavLi key="2" type="warning" value="logout" clickHandler={this.logout.bind(this)} />
    ];

    return (
      <ul className="nav navbar-nav navbar-right text-capitalize">
        {
          (this.props.user)
          ? addKeys(userListItems)
          : addKeys(guestListItems)
        }
      </ul>
    );
  } // end-render
} // end-Nav

export default Nav;
