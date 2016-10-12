const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    port: 5000,
    routes: {cors: true}
});

exports.server = server;

function createRouteConfig(description, responses) {
    return {
        tags: ['api'],
        description: description,
        plugins: {
            'hapi-swagger': {
                responses: responses
            }
        }
    }
}
exports.createRouteConfig = createRouteConfig;

exports.createRouteConfigWithPayload = function (description, payloadSchema, responses) {
    var config = createRouteConfig(description, responses);
    config.validate = {payload: payloadSchema};
    return config;
};
