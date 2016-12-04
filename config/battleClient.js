var unirest = require('unirest');

const serverURL = "http://pokemon-battle.bid/api/v1/";

//makes a query string out of an object
//e.g. {propt1: true, propt2:5} => "?propt1=true&propt2=5"
var toQueryString = function (obj) {
    var queryString = '';
    for (var propt in obj) {
        queryString += propt + '=' + obj[propt] + '&';
    }
    if (queryString == '')
        return queryString;
    else {
        queryString = queryString.substring(0, queryString.length - 1);
        return '?' + queryString;
    }
};

/*
 Many queries to the battleAPI have the optional params "offset", "limit" or simply an id.
 Some resources have special optional queries (e.g. Battles can be queried to obtain the battles with
 is_finised=ture/false and pokemon can be queried with their pokemon_type).

 This method forms requests to a certain resource and takes an optional opts param which will be converted
 into a query string, or in the case of id send directly as part of the URI.
 */
var requestWithOptionalParams = function (resourceURI, opts) {
    if (typeof opts === "undefined")
        opts = {};
    if (opts['id']) {
        return unirest.get(serverURL + resourceURI + "/" + opts.id)
            .headers({'Accept': 'application/json'});
    }
    else {
        return unirest.get(serverURL + resourceURI + "/" + toQueryString(opts))
            .headers({'Accept': 'application/json'});
    }
};

//Trainer routes
exports.getTrainers = function (opts) {
    return requestWithOptionalParams("trainers", opts);
};

//pokemon routes
exports.getPokemons = function (opts) {
    return requestWithOptionalParams("pokemons", opts);
};

//pokemon types routes
exports.getPokemonTypes = function (opts) {
    if (typeof opts === "undefined")
        opts = {};

    return unirest.get("http://pokemon-battle.bid/api/v1/pokemon-types/" + toQueryString(opts))
        .headers({'Accept': 'application/json'});
};

//battle routes
exports.getBattle = function(battleId){
    return requestWithOptionalParams("battles", {id: battleId});
};

exports.getBattles = function (opts) {
    return requestWithOptionalParams("battles", opts);
};

exports.getBattleLocation = function (battleId) {
    return unirest.get(serverURL + "battles/" + battleId + "/location")
        .headers({'Accept': 'application/json'});
};

exports.getBattlingTeam = function (battleId, teamNum) {
    return unirest.get(serverURL + "battles/" + battleId + "/team" + teamNum)
        .headers({'Accept': 'application/json'});
};

exports.getBattlingPokemons = function (battleId, teamNum) {
    return unirest.get(serverURL + "battles/" + battleId + "/team" + teamNum + "/pokemons")
        .headers({'Accept': 'application/json'});
};

exports.getBattlingTrainer = function (battleId, teamNum) {
    return unirest.get(serverURL + "battles/" + battleId + "/team" + teamNum + "/trainer")
        .headers({'Accept': 'application/json'});
};

//Example of how to use it. The opts object is converted directly into a query string
//so check what the battle api expects.
/*exports.getTrainers({limit:3,offset:1})
 .end(function (response){
 console.log(response.body);
 });*/
