const User = require('../models/user').User;
const _ = require('underscore');
const battleClient = require('../config/battleClient');

var exports = module.exports = {};

exports.getBattles = function (request, reply) {
    queryString=request.params.query_string;
    pairs=queryString.split("&");
    lim=pairs.find(function(str){return str.startsWith("limit")});
    offs=pairs.find(function(str){return str.startsWith("offset")});
    isF=pairs.find(function(str){return str.startsWith("is_finished")});

    battleClient.getBattles({limit: lim.split("=")[1],offset: offs.split("=")[1],is_finished: isF.split("=")[1]})
        .end(function (response) {
            reply(response.body).code(200);
    })
};