const httpAuth = require('http-auth');
const server = require('../config/server').server;
const User = require('../models/user').User;
const crypto = require('crypto');

var exports = module.exports = {};

const realm = "Pokemon Betting API";

const digest = httpAuth.digest({
        realm: realm
    },
    (username, callback, request) => {
        // library hack
        request.method = request.method.toUpperCase();

        var hash = "";
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (user != undefined) {
                hash = user.hash;
            }
            callback(hash);

        });
    }
);

function hapiAuth(){return require('../config/hapiAuth')}

server.register(hapiAuth());
server.auth.strategy('http-auth', 'http', digest);

exports.createHash = function (username, password) {
    // create password hash to store in db
    var hashSource = username + ":" + realm + ":" + password;
    var hash = crypto.createHash('MD5');
    hash.update(hashSource);
    return hash.digest('hex');
};