const superagent = require('superagent');

export const getAllServices = () => {
  const endpoint = process.env.NAGIOS_URL ||  'http://example.com';

  return new Promise((resolve, reject) => {
    superagent
      .get(endpoint + '/status')
      .then(res => {
        resolve(JSON.parse(res.text).content);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const isAService = (service, host) => {
  return new Promise((resolve, reject) => {
    getAllServices()
      .then(res => {
        if (service in res[host].services) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => reject());
  });
};

export const isAHost = host => {
  return new Promise((resolve, reject) => {
    getAllServices()
      .then(res => {
        const hostExists = host in res;
        if (hostExists) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => reject());
  });
};
