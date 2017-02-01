import { Link } from 'react-router';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// actions
import { DocumentActions, UserActions } from '../../actions';

// css
import './AuthLayout.css';

// stores
import { SpinnerStore, UserStore } from '../../stores';

class AuthLayout extends Component {
  constructor(props) {
    super(props);

    // vars
    this._spinnerStoreListenerToken = null;
    this._userStoreListenerToken = null;

    // state
    this.state = {
      authForms: UserStore.getAuthForms(),
      user: UserStore.getUser(),
      spinner: SpinnerStore.getSpinner()
    };

    // bind `this`
    this.changeForm = this.changeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  } // end-constructor

  componentWillMount() {
    this._spinnerStoreListenerToken = UserStore.addListener(() => {
      this.setState({
        spinner: SpinnerStore.getSpinner()
      });
    });
    this._userStoreListenerToken = UserStore.addListener(() => {
      this.setState({
        authForms: UserStore.getAuthForms(),
        user: UserStore.getUser()
      });
    });
  } // end-componentWillMount

  componentWillUnmount() {
    this._spinnerStoreListenerToken.remove();
    this._userStoreListenerToken.remove();
  } // end-componentWillMount

  componentDidUpdate() {
    // redirect to landing if user is connected
    if (this.state.user) {
      browserHistory.push('/');
    }
  } // end-componentWillUpdate

  changeForm(formName, payload) {
    let { fieldName, value } = payload;
    UserActions.changeForm({ formName, fieldName, value });
  } // end-changeForm

  submitForm(formName) {
    UserActions.submitForm({ formName });
    let { formSubmitted, formValid } = this.state.authForms[formName];
    if (formSubmitted && formValid) {
      if (formName === 'register') {
        this.register();
      } else if (formName === 'login') {
        this.login();
      }
    }
  } // end-submitForm

  register() {
    let { fullName, username, email, password } = this.state.authForms.register.formFields;
    UserActions.registerReq({ fullName, username, email, password });
  } // end-register

  login() {
    let { username, password } = this.state.authForms.login.formFields;
    UserActions.loginReq({ username, password }, () => {
      let user = UserStore.getUser();
      DocumentActions.loadPublicDocsReq(user);
      DocumentActions.loadUserDocsReq(user);
    });
  } // end-login

  render() {
    // children props
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      let props = {
        changeForm: this.changeForm,
        submitForm: this.submitForm,
        spinner: this.state.spinner
      };
      if (child.type.name === 'Register') {
        props.formData = this.state.authForms.register;
      } else if (child.type.name === 'Login') {
        props.formData = this.state.authForms.login;
      }
      return React.cloneElement(child, props);
    });

    return (
      <div className="auth-container">
        <div className="auth-form container">
          <div className="text-right">
            <Link to="/" className="back"><i className="fa fa-arrow-left"></i>Back to home</Link>
          </div>
          {childrenWithProps}
        </div>
      </div>
    );
  } // end-render
} // end-AuthLayout

export default AuthLayout;
