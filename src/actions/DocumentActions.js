import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import { http } from '../utils';

export const loadPublicDocsReq = (user) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.LOAD_PUBLIC_DOCS_REQ,
    payload: null
  });
  // get req
  http
    .getReq('/Documents?scope=public', {
      scope: 'appdata',
      token: user.token
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOAD_PUBLIC_DOCS_SUCCESS,
          payload: data.res
        });
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOAD_PUBLIC_DOCS_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
}; // end-loadPublicDocsReq

export const loadUserDocsReq = (user, cb) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.LOAD_USER_DOCS_REQ,
    payload: null
  });
  // get req
  http
    .getReq('/Documents?scope=user', {
      scope: 'appdata',
      token: user.token
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOAD_USER_DOCS_SUCCESS,
          payload: data.res
        });
        if (cb) cb();
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOAD_USER_DOCS_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
}; // end-loadUserDocsReq

export const viewSingleDocument = (id) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.VIEW_SINGLE_DOCUMENT,
    payload: {
      id
    }
  });
}; // end-viewSingleDocument
