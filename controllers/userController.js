const User = require('../models/user').User;
const Transaction = require('../models/transaction').Transaction;
const TransactionType = require('../models/transaction').TransactionType;
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
                balance: user.balance
            }
        });
        reply(users).code(200);
    })
};

function getUserIdFromRequest(request) {
    return request.auth.credentials.sub;
}

exports.getUserId = function (request, reply) {
    User.findById(request.params.id).then(function (user) {
        reply(user).code(200);
    })
};

exports.getUser = function(userId, callback){
    User.findById(userId).then(function(user){
        callback(user);
    });
};

exports.getAuthenticatedUser = function (request, callback) {
    var userId = getUserIdFromRequest(request);
    User.findById(userId).then(function (user) {
        callback(user);
    })
};

exports.replyWithAuthenticatedUser = function (request, reply) {
    exports.getAuthenticatedUser(request, function (user) {
        user = {
            id: user.id,
            username: user.username,
            email: user.email,
            balance: user.balance
        };
        reply(user).code(200);
    });
};

exports.updateUser = function(request, reply){
    User.findById(request.params.id).then(function(user){
       for (var attrName in request.orig.payload){
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
    var amount = request.payload.amount;
    var userId = getUserIdFromRequest(request);
    console.log(userId);
    console.log(request.auth.credentials.sub);
    if (userId != request.auth.credentials.sub) {
      reply().code(403); // User can only deposit to his own account
      return;
    }
    Transaction.create({
        user_id: userId,
        amount: amount,
        type: TransactionType.DEPOSIT
    }).then(transaction => {
        User.findById(userId).then(user => {
            user.balance += amount;
            user.save().then(() => {
                reply().code(204);
            }).catch(error => {
                reply().code(500);
            });
        });
    });
};

exports.withdraw = function (request, reply) {
    var amount = request.payload.amount;
    var userId = getUserIdFromRequest(request);
    if (userId != request.auth.credentials.sub) {
      reply().code(403); // User can only withdraw from his own account
      return;
    }
    User.findById(userId).then(user => {
        if (user.balance < amount) {
            return reply('Insufficient funds').code(400);
        }
        Transaction.create({
            user_id: userId,
            amount: -amount,
            type: TransactionType.WITHDRAWAL
        }).then(transaction => {
            user.balance -= amount;
            user.save().then(() => {
                reply().code(204);
            }).catch(error => {
                reply().code(500);
            });
        });
    });
};

exports.getTransactions = function (request, reply) {
    var userId = getUserIdFromRequest(request);
    var requestedUserId = request.params.id;

    if (userId != requestedUserId) {
        reply('Cannot request transactions of different user.').code(403);
        return;
    }

    Transaction.findAll({
        where: {
            user_id: userId
        }
    }).then(function (transactions) {
        reply(transactions).code(200);
    });
};
