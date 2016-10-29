const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = require('./config/server').server;
const battleAPI=require('./config/battleAPI').client;

// setup auth
require('./config/auth');
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


server.route({
    method: 'GET',
    path: '/protected',
    config: {
        auth: 'http-auth',
        handler: (request, reply) => {
            reply(`Welcome from hapi - ${request.auth.credentials.name}!`)
        }
    }
});

server.start();