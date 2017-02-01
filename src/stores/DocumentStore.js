import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import moment from 'moment';
import { Store } from 'flux/utils';

class DocumentStore extends Store {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    // dispatch token
    this.dispatchToken = this.getDispatchToken();

    this.state = {
      publicDocs: [],
      userDocs: [],
      currentDocument: null
    };
  } // end-constructor

  getLatestPublicDocs() {
    let latestDocs = this.state.publicDocs
      .map((doc) => doc)
      .sort((a, b) => {
        var aDate = moment(a.lastEdited).unix();
        var bDate = moment(b.lastEdited).unix();
        if (aDate > bDate) {
          return -1;
        } else {
          return 1;
        }
      })
      .slice(0, 3);
    return latestDocs;
  } // end-getLatestPublicDocs

  getPublicDocs() {
    return this.state.publicDocs;
  } // end-getPublicDocs

  getUserDocs() {
    return this.state.userDocs;
  } // end-getUserDocs

  getCurrentDocument() {
    return this.state.currentDocument;
  } // end-getCurrentDocument

  mapDocs(docs) {
    return docs.map((doc) => {
      return {
        id: doc['_id'],
        title: doc['title'],
        text: doc['text'],
        isPrivate: doc['isPrivate'],
        lastEdited: moment(doc['_kmd']['lmt']).format('MM/DD/YYYY'),
        user: doc['user']
      };
    });
  } // end-mapDocs

  storePublicDocs(docs) {
    this.state.publicDocs = this.mapDocs(docs);
  } // end-storePublicDocs

  storeUserDocs(docs) {
    this.state.userDocs = this.mapDocs(docs);
  } // end-storeUserDocs

  storeCurrentDocument(id) {
    this.state.currentDocument = this.state.publicDocs.filter((doc) => {
      return doc.id === id;
    })[0];
  } // end-storeCurrentDocument

  __onDispatch(action) {
    switch (action.type) {
      case CONSTANTS.LOAD_PUBLIC_DOCS_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.LOAD_PUBLIC_DOCS_SUCCESS:
        console.log(action.type);
        this.storePublicDocs(action.payload);
        break;
      case CONSTANTS.LOAD_PUBLIC_DOCS_ERROR:
        console.log(action.type);
        break;
      case CONSTANTS.LOAD_USER_DOCS_REQ:
        console.log(action.type);
        break;
      case CONSTANTS.LOAD_USER_DOCS_SUCCESS:
        console.log(action.type);
        this.storeUserDocs(action.payload);
        break;
      case CONSTANTS.LOAD_USER_DOCS_ERROR:
        console.log(action.type);
        break;
      case CONSTANTS.VIEW_SINGLE_DOCUMENT:
        console.log(action.type);
        this.storeCurrentDocument(action.payload.id);
        break;
      default:
        // what!
    }

    this.__emitChange();
  } // end-__onDispatch
} // end-DocumentStore

export default new DocumentStore(AppDispatcher);
