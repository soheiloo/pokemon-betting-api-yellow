const User = require('../models/user').User;
const _ = require('underscore');
const auth = require('../config/auth');

var exports = module.exports = {};

exports.getUsers = function (request, reply) {
    User.findAll().then(function (users) {
        // remove password hash from user objects
        users = _.map(users, function (user) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                balance: user.balance}
        });
        reply(users).code(200);
    })
};

exports.getUserId = function(request, reply){
    User.findById(request.params.id).then(function(user){
        reply(user).code(200);
    })
};

exports.getAuthenticatedUser = function(request, callback){
    var userId = request.auth.credentials.sub;
    User.findById(userId).then(function(user){
        user = {
            id: user.id,
            username: user.username,
            email: user.email,
            balance: user.balance
        };
        callback(user);
    })
};

exports.replyWithAuthenticatedUser = function(request, reply){
    exports.getAuthenticatedUser(request, function(user){
        reply(user).code(200);
    });
};

exports.updateUser = function(request, reply){
    User.findById(request.params.id).then(function(user){
       for(var attrName in request.payload){
            if(attrName === 'password'){
                var hashPassword = auth.createHash(request.payload[attrName]);
                user[attrName] = hashPassword;
            } else {
                user[attrName] = request.payload[attrName];
            }
        }
        user.save();
        
        return reply(user).code(200);
    })
};

exports.saveUser = function (request, reply) {
    
    User.create({
        username: request.payload.username,
        password: auth.createHash(request.payload.password),
        email: request.payload.email,
        balance: request.payload.balance
    })
    
    .then(function (user) {
        user = {
            id: user.id,
            username: user.username,
            email: user.email,
            balance: user.balance
        };
        reply(user).code(201);
    })
};

exports.deposit = function (request, reply) {
    var amount = request.params.amount;
    var userId = request.auth.credentials.sub;
    User.findById(userId).then(user => {
        user.balance += amount;
        user.save().then(() => {
            reply().code(204);
        }).catch(error => {
            reply().code(500);
        });
    });
};

exports.withdraw = function (request, reply) {
    var amount = request.params.amount;
    var userId = request.auth.credentials.sub;
    User.findById(userId).then(user => {
        if (user.balance < amount) {
            return reply('Insufficient funds').code(400);
        }
        user.balance -= amount;
        user.save().then(() => {
            reply().code(204);
        }).catch(error => {
            reply().code(500);
        });
    });
};
