const rp = require('request-promise');
const cache = require('memory-cache');

const component = require('./apiAccess').component;

const getJSON = (url, cb) => {
    
    // retrive possible content from volatile memory
    const cachedResult = cache.get(url);
    if (cachedResult !== null) {
        return new Promise((resolve, reject) => {
            if (cb) {
                // call callback without errors
                cb(cachedResult, false);
            }
            resolve(cachedResult);
        });
    } else {
        // retrive data from the web
        const options = {
            url: url,
            json: true,
            timeout: component.timeout
        };
        return rp.get(options)
            .catch((error) => {
                if (!cb) {
                    // throw if a Promise
                    throw error;
                } else {
                    // call the callback with error as second parameter
                    cb('error', error);
                }
            })
            .then((response) => {
                if (response) {

                    // if there was an error
                    if (response.statusCode !== undefined && response.statusCode !== 200) {
                        if (!cb) {
                            // throw if a Promise
                            throw response;
                        } else {
                            // call the callback with error as second parameter
                            cb('error', response);
                        }
                    } else {
                        // if everything was good
                        // cache the object in volatile memory
                        // only if cacheLimit > 0
                        
                            cache.put(url, response);
                        

                        // if a callback is present
                        if (cb) {
                            // call it, without errors
                            cb(response, false);
                        } else {
                            // return the Promise
                            return response;
                        }
                    }
                }
            }); 
    }
};

exports.getJSON = getJSON;