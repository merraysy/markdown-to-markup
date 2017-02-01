import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import { md } from '../utils';
import { Store } from 'flux/utils';

// stores
import { DocumentStore } from './';

class EditorStore extends Store {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    // dispatch token
    this.dispatchToken = this.getDispatchToken();

    this.state = {
      currentDoc: null
    };
  } // end-constructor

  getInput() {
    return this.state.currentDoc ? this.state.currentDoc.text : null;
  } // end-getInput

  getOutput() {
    return this.state.currentDoc ? md(this.state.currentDoc.text) : null;
  } // end-getOutput

  getCurrentDoc() {
    return this.state.currentDoc;
  } // end-getCurrentDoc

  editDoc(payload) {
    let userDocs = DocumentStore.getUserDocs();
    let currentDoc = userDocs.filter((doc) => {
      return doc.id === payload.id;
    })[0];
    this.state.currentDoc = currentDoc;
  } // end-editDoc

  changeDoc(nVals) {
    const createTitle = (text) => {
      const titleRe = /([^#*`]{1,15})/;
      const result = titleRe.exec(text);
      return titleRe.test(text) ? `${result[1]}...` : 'no title';
    }

    for (var key in nVals) {
      if (nVals.hasOwnProperty(key)) {
        let val = nVals[key];
        this.state.currentDoc[key] = val;
        if (key === 'text') {
          this.state.currentDoc.title = createTitle(val);
        }
      }
    }
  } // end-changeDoc

  deleteDoc(payload) {
    if (this.state.currentDoc.id === payload.id) {
      this.state.currentDoc = null;
    }
  } // end-deleteDoc

  logout() {
    this.state.currentDoc = null;
  } // end-logout

  __onDispatch(action) {
    switch (action.type) {
      case CONSTANTS.EDIT_DOC:
        console.log(action.type);
        this.editDoc(action.payload);
        break;
      case CONSTANTS.CHANGE_DOC:
        console.log(action.type);
        this.changeDoc(action.payload);
        break;
      case CONSTANTS.SAVE_DOC_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.SAVE_DOC_SUCCESS:
        console.log(action.type);
        break;
      case CONSTANTS.SAVE_DOC_ERROR:
        console.log(action.type);
        break;
      case CONSTANTS.NEW_DOC_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.NEW_DOC_SUCCESS:
        console.log(action.type);
        break;
      case CONSTANTS.NEW_DOC_ERROR:
        console.log(action.type);
        break;
      case CONSTANTS.DELETE_DOC_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.DELETE_DOC_SUCCESS:
        console.log(action.type);
        this.deleteDoc(action.payload);
        break;
      case CONSTANTS.DELETE_DOC_ERROR:
        console.log(action.type);
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
} // end-EditorStore

export default new EditorStore(AppDispatcher);
