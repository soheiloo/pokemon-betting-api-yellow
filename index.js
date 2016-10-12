const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = require('./config/server').server;

// create routes
require('./routes/routes');

const swaggerOptions = {
    info: {
        'title' : 'Betting API Yellow',
        'version': '1.0'
    },
    documentationPath: '/doc'
};

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    }
]);

server.start();