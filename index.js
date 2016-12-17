const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = require('./config/server').server;

// setup auth
require('./config/auth');
// create routes
require('./routes/routes');
// start socket listening (automatic recording of battle logs)
require('./config/socket');
// setup live socket polling
require('./config/messageBus');

const swaggerOptions = {
    info: {
        'title' : 'Betting API Yellow',
        'version': '1.0'
    },
    documentationPath: '/'
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

console.log("Server is up and running.");