const superagent = require('superagent');

const STATUS_ENDPOINT = 'http://example.com/status';

export const getAllServices = () => {
    return new Promise((resolve, reject) => {
        superagent
            .get(STATUS_ENDPOINT)
            .then((res) => {
                resolve(JSON.parse(res.text).content)
            }).catch((err) => {
            reject(err)
        })
    })
};

export const isAService = (service, host) => {
    return new Promise((resolve, reject) => {
        getAllServices()
            .then((res) => {
                if (service in res[host].services) {
                    resolve(true)
                } else {
                    reject(false)
                }
            })
            .catch(() => reject())
    })
};

export const isAHost = (host) => {
    return new Promise((resolve, reject) => {
        getAllServices().then((res) => {
            const hostExists = host in res;
            if (hostExists) {
                resolve(true)
            } else {
                reject(false)
            }
        }).catch(() => reject())
    })
};