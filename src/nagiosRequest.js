const superagent = require('superagent');

export const sendPost = (endpoint, data, cb) => {
  const url = process.env.NAGIOS_URL ||  'http://example.com';

  superagent
    .post(url + '/' + endpoint)
    .send(data)
    .accept('application/json')
    .end((err, res) => cb(err, res));
};
