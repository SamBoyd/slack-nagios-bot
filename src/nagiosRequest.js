const superagent = require('superagent');

export const sendPost = (endpoint, data, cb) => {
  superagent
    .post('http://example.com' + '/' + endpoint)
    .send(data)
    .accept('application/json')
    .end((err, res) => cb(err, res));
};
