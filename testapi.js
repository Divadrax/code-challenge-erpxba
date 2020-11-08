// This file provides wrapper functions around the Axios get() and post() methods to retry on failure.

import axios from 'axios';

function logStatus(r) {
  console.log(r.status, r.statusText);
  return Promise.resolve(r);
}

function robustGet(uri) {
  console.log('GET', uri);
  return axios.get(uri, { responseType: 'json' })
    .then(logStatus)
    .then(r => r.data)
    .catch(e => {
      console.error('An error occurred; trying again.');
      return robustGet(uri);
    });
}

function robustPost(uri, data) {
  console.log('POST', uri, data);
  return axios.post(uri, data)
    .then(logStatus)
    .catch(e => {
      console.error('An error occurred; trying again.');
      return robustPost(uri, data);
    })
}

export default {
  get: robustGet,
  post: robustPost
};
