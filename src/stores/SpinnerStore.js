import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import { Store } from 'flux/utils';

class SpinnerStore extends Store {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    // dispatch token
    this.dispatchToken = this.getDispatchToken();

    this.spinner = {
      spinning: false,
      text: ''
    };
  } // end-constructor

  getSpinner() {
    return this.spinner;
  } // end-getSpinner

  start(text) {
    this.spinner = {
      spinning: true,
      text
    }
  } // end-start

  stop() {
    this.spinner = {
      spinning: false,
      text: ''
    }
  } // end-stop

  __onDispatch(action) {
    switch (action.type) {
      case CONSTANTS.LOAD_PUBLIC_DOCS_REQ:
        console.log(action.type);
        this.start('Loading...');
        break;
      case CONSTANTS.LOAD_PUBLIC_DOCS_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.LOAD_PUBLIC_DOCS_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.LOAD_USER_DOCS_REQ:
        console.log(action.type);
        this.start('Loading...');
        break;
      case CONSTANTS.LOAD_USER_DOCS_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.LOAD_USER_DOCS_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.LOGIN_REQ:
        console.log(action.type);
        this.start('Loging in...');
        break;
      case CONSTANTS.LOGIN_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.LOGIN_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.REGISTER_REQ:
        console.log(action.type);
        this.start('Registering...');
        break;
      case CONSTANTS.REGISTER_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.REGISTER_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.NEW_DOC_REQ:
        console.log(action.type);
        this.start('Creating...');
        break;
      case CONSTANTS.NEW_DOC_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.NEW_DOC_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.SAVE_DOC_REQ:
        console.log(action.type);
        this.start('Saving...');
        break;
      case CONSTANTS.SAVE_DOC_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.SAVE_DOC_ERROR:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.DELETE_DOC_REQ:
        console.log(action.type);
        this.start('Deleting...');
        break;
      case CONSTANTS.DELETE_DOC_SUCCESS:
        console.log(action.type);
        this.stop();
        break;
      case CONSTANTS.DELETE_DOC_ERROR:
        console.log(action.type);
        this.stop();
        break;
      default:
        // what!
    }

    this.__emitChange();
  } // end-__onDispatch
} // end-SpinnerStore

export default new SpinnerStore(AppDispatcher);
