const User = require('../models/user').User;
const _ = require('underscore');
const battleClient = require('../config/battleClient');

var exports = module.exports = {};

exports.getBattles = function (request, reply) {
    var queryString = request.params.query_string;
    var pairs = queryString.split("&");
    var lim = pairs.find(function (str) {
        return str.startsWith("limit")
    });
    var offs = pairs.find(function (str) {
        return str.startsWith("offset")
    });
    var isF = pairs.find(function (str) {
        return str.startsWith("is_finished")
    });

    battleClient.getBattles({limit: lim.split("=")[1], offset: offs.split("=")[1], is_finished: isF.split("=")[1]})
        .end(function (response) {
            reply(response.body).code(200);
        })
};