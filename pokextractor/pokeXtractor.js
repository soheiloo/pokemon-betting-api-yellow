const async = require('async');
const endpoints = require('./pokeExtractorEndpoint.json');
const endpointsList = require('./pokeExtractorEndpoints.json');
const getJSON = require('./getter.js');
const component = require('./apiAccess.js').component;
const controller = require('./apiAccess.js').controller;

class PokeXtractor {
    constructor(config) {
        controller.setPokeXtractor(config);
        
        // add to the Extractor all the endpoints
        endpoints.forEach((endpoint) => {
            this[endpoint[0]] = (input, cb) => { 
                if (input) {

                    // if the user has submitted a Name or an Id, return the Json promise
                    if (typeof input === 'number' || typeof input === 'string') {
                        return getJSON.getJSON(`${component.protocol}${component.serverAdress}${component.apiPath}${endpoint[1]}/${input}/`, cb); 
                    }

                    // if the user has submitted an Array
                    // return a new promise which will resolve when all getJSON calls are ended
                    else if (typeof input === 'object') {
                        let toReturn = [];
                        return new Promise((resolve, reject) => {

                            // fetch data asynchronously to be faster
                            async.forEachOf(input, (name) => {

                                //get current input data and then try to resolve
                                getJSON(`${component.protocol}${component.serverAdress}${component.apiPath}${endpoint[1]}/${name}/`, (response) => {
                                    toReturn.push(response);
                                    if(toReturn.length === input.length){
                                        if (cb) {
                                            cb(toReturn);
                                        }
                                        resolve(toReturn);
                                    }
                                });
                            });
                        });
                    }
                }
            }
        });

        endpointsList.forEach((endpointsList) => {
            this[endpointsList[0]] = (config, cb) => {
                controller.setPokeXtractorEndpoints(config);
                return getJSON.getJSON(`${component.protocol}${component.serverAdress}${component.apiPath}${endpointsList[1]}?limit=${component.limit}&offset=${component.offset}`, cb);
            }
        });
    }
};

module.exports = PokeXtractor;