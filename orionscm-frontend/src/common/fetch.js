import isomorphicFetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';
import _ from 'lodash';

function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(console.error('(in promise) Error: API timeout...'));
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    });
}

export default function fetch(url, { timeout = 30000, ...options } = {}) {
    options.headers = Object.assign({ "Content-Type": "application/json" }, options.headers);
    options = Object.assign({ credentials: 'include' }, options);
    options.headers = Object.assign({ "token": Cookie.get('token')}, options.headers);
    return timeoutPromise(timeout, isomorphicFetch(url, options));
}