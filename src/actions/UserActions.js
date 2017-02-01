import AppDispatcher from '../AppDispatcher';
import CONSTANTS from '../AppConstants';
import { http } from '../utils';

export const changeForm = (payload) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.CHANGE_FORM,
    payload
  });
}; // end-changeForm

export const submitForm = (payload) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.SUBMIT_FORM,
    payload
  });
}; // end-submitForm

export const registerReq = (userObj) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.REGISTER_REQ,
    payload: null
  });
  // post register form
  http
    .postReq(null, {
      scope: 'user',
      body: userObj
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.REGISTER_SUCCESS,
          payload: null
        });
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.REGISTER_ERROR,
          payload: {
            message: data.res.description
          }
        });
      }
    }, (data) => {
      console.log(data);
    });
}; // end-registerReq

export const loginReq = (userObj, cb) => {
  AppDispatcher.dispatch({
    type: CONSTANTS.LOGIN_REQ,
    payload: null
  });
  // post login form
  http
    .postReq('/login', {
      scope: 'user',
      body: userObj
    })
    .then((data) => {
      if (data.raw.ok) {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOGIN_SUCCESS,
          payload: data.res
        });
        if (cb) cb();
      } else {
        AppDispatcher.dispatch({
          type: CONSTANTS.LOGIN_ERROR,
          payload: {
            message: data.res.description
          }
        })
      }
    }, (data) => {
      console.log(data);
    });
}; // end-loginReq

export const logout = () => {
  AppDispatcher.dispatch({
    type: CONSTANTS.LOGOUT,
    payload: null
  });
};
