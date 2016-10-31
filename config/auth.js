const jwtAuth = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Server = require('../config/server');
const User = require('../models/user').User;
const crypto = require('crypto');

const server = Server.server;

// normally would not be stored here
const secret = 'OfP5JGgpYxXkWbnABc5dq/H7fhcUeDDbJQV+cSNi33165+t9QwKXW7VU40Qvplf+9ZutUujr8FbF6r4d+PSXPUCxgxF1N2Qav0gVmk85IBEjtLiQX0D3n8D/jZC9tiuTjbT8mtvhmf9wgFJJEr1lkulLvolSHev0e1E/meBuEnOBi8iXRQfWPm4latcY87B7buLdo2aYybjBg89IqaC6fvORZiUTGWdCabPTkGBgFmMshrBERZ23mgkyahC6ush9pFsEndyiGcze7mMjMwoCijx9u7tRLHX8JqVeKXE9c69hqpFQa/TEWKpDU4i8FD3kZEL8Uyzh8EjnlITd0XNFhA==';

var exports = module.exports = {};

function createToken(request){
    return jwt.sign({
        auth: 'magic',
        agent: request.headers['user-agent'],
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 60 // one hour in seconds
    }, Buffer.from(secret, 'base64'));
}

var validate = function (decoded, request, callback) {
    callback(null, true);
};

server.register(jwtAuth, function (err) {
    if (err) {
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
        {
            key: Buffer.from(secret, 'base64'),
            validateFunc: validate,
            verifyOptions: {algorithms: ['HS256']}
        });

    server.auth.default('jwt');


    var loginUserConfiguration = Server.createRouteConfigWithPayload(
        'Login',
        {
            username: Joi.string(),
            hash: Joi.string()
        },
        {
            200: {
                description: 'Logged in',
            },
            401: {
                description: 'Incorrect credentials'
            }
        }
    );

    loginUserConfiguration.auth = false;

    server.route([
        {
            method: 'POST', path: '/login',
            config: loginUserConfiguration,
            handler: function (request, reply) {
                User.findOne({
                    where: {
                        username: request.payload.username
                    }
                }).then(function (user) {
                    if (user == undefined || user.hash != request.payload.hash) {
                        reply('Incorrect credentials').code(401);
                    }else{
                        var token = createToken(request);
                        reply(token).code(200);
                    }
                });
            }
        },
        {
            method: 'GET', path: '/restricted', config: {auth: 'jwt'},
            handler: function (request, reply) {
                reply({text: 'You used a Token!'})
                    .header("Authorization", request.headers.authorization);
            }
        }
    ]);
});


exports.createHash = function (username, password) {
    // create password hash to store in db
    var hash = crypto.createHash('MD5');
    hash.update(password);
    return hash.digest('hex');
};