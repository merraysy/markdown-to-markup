import _ from 'lodash';

// api settings
const api = {
  getLink: (scope) => `https://baas.kinvey.com/${scope}/kid_B1MOUA64l`,
  getHeaders: (token) => {
    let auth;
    if (token) {
      auth = `Kinvey ${token}`;
    } else {
      auth = 'Basic a2lkX0IxTU9VQTY0bDpkMWE2ZDNiNDYxYTg0ZjNkODIxNGUzZTE4ODM1MTE4Zg==';
    }
    return {
      'Content-Type': 'application/json',
      'X-Kinvey-API-Version': '3',
      'Authorization': auth
    };
  }
} // and-api

// helpers
const pResolve = (res, resolve) => {
  let raw = _.assign(res);
  res
    .json()
    .then((res) => {
      resolve({ raw, res });
    });
};

const pReject = (err, reject) => {
  let raw = _.assign(err);
  err
    .json()
    .then((err) => {
      reject({ raw, err });
    });
};

const getReq = (endpoint, opts) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.getLink(opts.scope)}${endpoint ? endpoint : ''}`, {
      method: 'GET',
      headers: api.getHeaders(opts.token)
    }).then((res) => {
      pResolve(res, resolve);
    }, (err) => {
      pReject(err, reject);
    });
  });
} // end-getReq

const postReq = (endpoint, opts) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.getLink(opts.scope)}${endpoint ? endpoint : ''}`, {
      method: 'POST',
      headers: api.getHeaders(opts.token),
      body: JSON.stringify(opts.body)
    }).then((res) => {
      pResolve(res, resolve);
    }, (err) => {
      pReject(err, reject);
    });
  });
} // end-postReq

const putReq = (endpoint, opts) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.getLink(opts.scope)}${endpoint ? endpoint : ''}`, {
      method: 'PUT',
      headers: api.getHeaders(opts.token),
      body: JSON.stringify(opts.body)
    }).then((res) => {
      pResolve(res, resolve);
    }, (err) => {
      pReject(err, reject);
    });
  });
} // end-putReq

const deleteReq = (endpoint, opts) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.getLink(opts.scope)}${endpoint ? endpoint : ''}`, {
      method: 'DELETE',
      headers: api.getHeaders(opts.token)
    }).then((res) => {
      pResolve(res, resolve);
    }, (err) => {
      pReject(err, reject);
    });
  });
} // end-deleteReq

export default {
  getReq,
  postReq,
  putReq,
  deleteReq
}
