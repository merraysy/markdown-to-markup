import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import { http } from '../utils';

export const newDocReq = (user, cb) => {
  let { id, username, fullName, email } = user;
  AppDispatcher.dispatch({
    type: CONSTANTS.NEW_DOC_REQ,
    payload: null
  });
  // post req
  http
    .postReq('/Documents', {
      scope: 'appdata',
      token: user.token,
      body: {
        title: 'no title',
        text: '',
        isPrivate: false,
        user: {
          id,
          username,
          fullName,
          email
        }
      }
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.NEW_DOC_SUCCESS,
          payload: data.res
        });
        if (cb) cb(data.res._id);
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.NEW_DOC_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
}; // end-newDocReq

export const editDoc = (id) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.EDIT_DOC,
    payload: {
      id
    }
  });
} // end-editDoc

export const changeDoc = (nVals) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.CHANGE_DOC,
    payload: nVals
  });
} // end-changeDoc

export const saveDoc = (user, currentDoc, cb) => {
  let { id, username, fullName, email } = user;
  AppDispatcher.dispatch({
    type: CONSTANTS.SAVE_DOC_REQ,
    payload: null
  });
  // put req
  http
    .putReq(`/Documents/${currentDoc.id}`, {
      scope: 'appdata',
      token: user.token,
      body: {
        title: currentDoc.title,
        text: currentDoc.text,
        isPrivate: currentDoc.isPrivate,
        user: {
          id,
          username,
          fullName,
          email
        }
      }
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.SAVE_DOC_SUCCESS,
          payload: data.res
        });
        if (cb) cb();
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.SAVE_DOC_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
} // end-saveDoc

export const deleteDoc = (user, id, cb) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.DELETE_DOC_REQ,
    payload: null
  });
  // delete req
  http
    .deleteReq(`/Documents/${id}`, {
      scope: 'appdata',
      token: user.token
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.DELETE_DOC_SUCCESS,
          payload: {
            id
          }
        });
        if (cb) cb();
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.DELETE_DOC_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
} // end-deleteDoc
