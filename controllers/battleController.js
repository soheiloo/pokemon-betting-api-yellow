const User = require('../models/user').User;
const _ = require('underscore');
const battleClient = require('../config/battleClient');

var exports = module.exports = {};

function getBattlesForQuery(queryString, callback){
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
            callback(response.body);
        })
}

exports.getBattles = function (request, reply) {
    var queryString = request.params.query_string;
    getBattlesForQuery(queryString, function(response){
        reply(response).code(200);
    });
};

exports.getNextBattles = function(callback){
    var queryString = "limit=5&offset=0&is_finished=false";
    getBattlesForQuery(queryString, function(response){
        callback(response);
    })
};