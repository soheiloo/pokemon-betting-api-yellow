const PokeXtractor = require('../pokextractor/pokeXtractor');
const P = new PokeXtractor();

var exports = module.exports = {};

exports.getPokemons = function (request, reply) {
    var pokeList = [];
    var interval =  {
                      limit: request.query.limit,
                      offset: request.query.offset
                    };
    P.getPokemonsList(interval)
    .then(function(responses) {
        for(var i = 0; i < interval.limit; i++){
            var id = interval.offset + i;
            pokeList.push(
                {   
                    id: id,
                    url: responses.results[i].url,
                    name: responses.results[i].name
                }
            );
        }
        reply(pokeList).code(200);
    });       
};

exports.getPokemonsTypes = function(request, reply){
    var pokeTypesList = [];
    var interval =  {
                      limit: request.query.limit,
                      offset: request.query.offset
                    };
    P.getTypesList(interval)
     .then(function(responses) {
        for(var i = 0; i < interval.limit; i++){
            var id = interval.offset + i;
            if(id === 19){
                id = 1001;
            }
            if(id === 20){
                id = 1002;
            }
            pokeTypesList.push(
                {   
                    id: id,
                    url: responses.results[i].url,
                    name: responses.results[i].name
                }
            );
        }
        reply(pokeTypesList).code(200)     
    });
};

exports.getPokemonId = function(request,reply){
    P.getPokemonByName(request.params.id)
    .then(function(response) {
        var pokemonInfo = {};
        
        pokemonInfo.id = response.id;
        pokemonInfo.name = response.name;
        //Fix the type problem
        pokemonInfo.type_one = response.types[0].type.name;
        //pokemonInfo.type_two = response.types[1].type.name;
        pokemonInfo.height = response.height;
        pokemonInfo.weight = response.weight;
        pokemonInfo.base_experience = response.base_experience;
        pokemonInfo.sprites = {
            front_default: response.sprites.front_default,
            back_default: response.sprites.back_default,
            front_shiny: response.sprites.front_shiny,
            back_shiny: response.sprites.back_shiny
        };
            
        
        reply(pokemonInfo)
    });
}