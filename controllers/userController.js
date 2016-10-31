const User = require('../models/user').User;
const _ = require('underscore');
const auth = require('../config/auth');

var exports = module.exports = {};

exports.getUsers = function (request, reply) {
    User.findAll().then(function (users) {
        // remove password hash from user objects
        users = _.map(users, function (user) {
            return {id: user.id, username: user.username, email: user.email}
        });
        reply(users).code(200);
    })
};

exports.saveUser = function (request, reply) {
    var payload = request.payload;
    var username = payload.username;
    var password = payload.password;

    var hash = auth.createHash(username, password);

    User.create({
        username: username,
        email: payload.email,
        hash: hash
    }).then(function (user) {
        user = {id: user.id, username: user.username, email: user.email};
        reply(user).code(201);
    })
};