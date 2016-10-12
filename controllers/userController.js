const User = require('../models/user').User;

var exports = module.exports = {};

exports.getUsers = function (request, reply) {
    User.findAll().then(function (users) {
        reply(users).code(200);
    })
};

exports.saveUser = function (request, reply) {
    var payload = request.payload;
    User.create({
        username: payload.username,
        email: payload.email
    }).then(function(user){
        reply(user).code(201);
    })
};