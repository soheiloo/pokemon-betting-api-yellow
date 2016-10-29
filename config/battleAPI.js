//var jayson = require('http://pokemon-battle.bid/api/v1/');
//var jayson = require(__dirname + '/../..');
var Client = require('node-rest-client').Client;


const client = new Client();
exports.client = client;

client.registerMethod("trainers", "http://pokemon-battle.bid/api/v1/trainers/", "GET");
client.registerMethod("battles", "http://pokemon-battle.bid/api/v1/battles/", "GET");
client.registerMethod("pokemon-types", "http://pokemon-battle.bid/api/v1/pokemon-types/", "GET");
client.registerMethod("pokemons", "http://pokemon-battle.bid/api/v1/pokemons/", "GET");

client.methods.battles(function(data, response){
    console.log(data);
});