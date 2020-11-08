import axios from 'axios';

function robustGet(uri) {
  console.log('GET', uri);
  return axios.get(uri, { responseType: 'json' })
    .then(r => r.data)
    .catch(e => {
      console.error('An error occurred; trying again.');
      return robustGet(uri);
    });
}

function robustPost(uri, data) {
  console.log('POST', uri, data);
  return axios.post(uri, data)
    .catch(e => {
      console.error('An error occurred; trying again.');
      return robustPost(uri, data);
    })
}

export default {
  get: robustGet,
  post: robustPost
};
