import _ from 'lodash';
import CONSTANTS from '../AppConstants';
import Dispatcher from '../AppDispatcher';
import { browserHistory } from 'react-router';
import { Store } from 'flux/utils';

// utils
import { validate, validators } from '../utils';

class UserStore extends Store {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    // dispatch token
    this.dispatchToken = this.getDispatchToken();

    // initial state
    this.authForms = {
      login: {
        formFields: {
          username: '',
          password: ''
        },
        formSubmitted: false,
        formErrors: [],
        formValid: false,
        formMessage: {}
      },
      register: {
        formFields: {
          fullName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        formSubmitted: false,
        formErrors: [],
        formValid: false,
        formMessage: {}
      },
      userRegistered: false
    }; // end-state

    // connected user
    this.user = null;

    // form validations
    this._validations = {
      register: [
        validate('fullName', 'Full name', validators.required()),
        validate('username', 'Username', validators.required(), validators.minLength(4)),
        validate('email', 'Email', validators.required(), validators.email()),
        validate('password', 'Password', validators.required(), validators.minLength(6)),
        validate('confirmPassword', 'Password confirmation', validators.required(), validators.match('password', 'Password')),
      ],
      login: [
        validate('username', 'Username', validators.required()),
        validate('password', 'Password', validators.required())
      ]
    };
  } // end-constructor

  getAuthForms() {
    return this.authForms;
  } // end-getAuthForms

  getUser() {
    return this.user;
  } // end-getToken

  setAuthForms(newState, cb) {
    this.authForms = _.merge(this.authForms, newState);
    if (cb) cb();
  } // end-setAuthForms

  validateForm(formName, cb) {
    // check for errors
    const formHasErrors = (errors) => {
      let found = false;
      errors.forEach((error) => {
        if (error) {
          found = true;
        }
      });
      return found;
    };
    // create form errors
    let formErrors = [];
    this._validations[formName].forEach((validation) => {
      formErrors.push(validation(this.authForms[formName].formFields));
    });
    // set form errors
    this.setAuthForms({
      [formName]: {
        formErrors
      }
    }, () => {
      // check form validity
      let formValid = !formHasErrors(this.authForms[formName].formErrors);
      // set form validity
      this.setAuthForms({
        [formName]: {
          formValid
        }
      }, () => {
        if (cb) cb();
      });
    });
  } // end-validateForm

  changeForm(payload) {
    let { formName, fieldName, value } = payload;
    this.setAuthForms({
      [formName]: {
        formFields: {
          [fieldName]: value
        }
      }
    }, () => {
      if (this.authForms[formName].formSubmitted) {
        this.validateForm(formName);
      }
    });
  } // end-changeForm

  submitForm(payload) {
    let { formName } = payload;
    this.setAuthForms({
      [formName]: {
        formSubmitted: true
      }
    });
    this.validateForm(formName);
  } // end-submitForm

  setFormMessage(formName, type , value) {
    this.setAuthForms({
      [formName]: {
        formMessage: { type, value }
      }
    });
  } // end-setFormMessage

  register() {
    this.setAuthForms({
      userRegistered: true
    });
    browserHistory.push('/auth/login');
  } // end-register

  login(data) {
    let { _id: id, fullName, username } = data;
    let { authtoken: token } = data._kmd;
    this.user = { id, fullName, username, token };
  } // end-login

  logout() {
    this.user = null;
    this.setAuthForms({
      userConnected: false,
      userRegistered: false
    });
    browserHistory.push('/');
  } // end-logout

  __onDispatch(action) {
    switch (action.type) {
      case CONSTANTS.CHANGE_FORM:
        console.log(action.type);
        this.changeForm(action.payload);
        break;
      case CONSTANTS.SUBMIT_FORM:
        console.log(action.type);
        this.submitForm(action.payload);
        break;
      case CONSTANTS.REGISTER_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.REGISTER_SUCCESS:
        console.log(action.type);
        this.register();
        break;
      case CONSTANTS.REGISTER_ERROR:
        console.log(action.type);
        this.setFormMessage('register', 'error', action.payload.message);
        break;
      case CONSTANTS.LOGIN_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.LOGIN_SUCCESS:
        console.log(action.type);
        this.login(action.payload);
        break;
      case CONSTANTS.LOGIN_ERROR:
        console.log(action.type);
        this.setFormMessage('login', 'error', action.payload.message);
        break;
      case CONSTANTS.LOGOUT:
        console.log(action.type);
        this.logout();
        break;
      default:
        // what!
    }

    this.__emitChange();
  } // end-__onDispatch
} // end-UserStore

export default new UserStore(Dispatcher);

// TODO: add loading
