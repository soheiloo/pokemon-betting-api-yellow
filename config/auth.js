const jwtAuth = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const server = require('../config/server').server;
const User = require('../models/user').User;
const crypto = require('crypto');
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;

// normally would not be stored here
const secret = 'OfP5JGgpYxXkWbnABc5dq/H7fhcUeDDbJQV+cSNi33165+t9QwKXW7VU40Qvplf+9ZutUujr8FbF6r4d+PSXPUCxgxF1N2Qav0gVmk85IBEjtLiQX0D3n8D/jZC9tiuTjbT8mtvhmf9wgFJJEr1lkulLvolSHev0e1E/meBuEnOBi8iXRQfWPm4latcY87B7buLdo2aYybjBg89IqaC6fvORZiUTGWdCabPTkGBgFmMshrBERZ23mgkyahC6ush9pFsEndyiGcze7mMjMwoCijx9u7tRLHX8JqVeKXE9c69hqpFQa/TEWKpDU4i8FD3kZEL8Uyzh8EjnlITd0XNFhA==';

var exports = module.exports = {};

function createToken(request, user) {
    return jwt.sign({
        auth: 'magic',
        agent: request.headers['user-agent'],
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 60, // one hour in seconds
        sub: user.id
    }, Buffer.from(secret, 'base64'));
}

var validate = function (decoded, request, callback) {
    callback(null, true);
};

function createHash(password) {
    var hash = crypto.createHash('MD5');
    hash.update(password);
    return hash.digest('hex');
}

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


    var loginUserConfiguration = new RouteConfigBuilder()
        .setAuth(false)
        .setDescription('Login')
        .setPayloadSchema({username: Joi.string(), password: Joi.string()})
        .setResponses({
            200: {
                description: 'Logged in',
            },
            401: {
                description: 'Incorrect credentials'
            }
        })
        .build();


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
                    var requestHash = createHash(request.payload.password);
                    if (user == undefined || user.password != requestHash) {
                        reply('Incorrect credentials').code(401);
                    } else {
                        var token = createToken(request, user);
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


exports.createHash = createHash;