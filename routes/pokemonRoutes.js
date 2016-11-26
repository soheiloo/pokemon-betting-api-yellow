const Joi = require('joi');
const PokemonController = require('../controllers/pokemonController');
const PokemonSchemata = require('../validators/pokemonSchemata');
const server = require('../config/server').server;
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;

//Get Pokemons info by id
var getPokemonIdConfig = new RouteConfigBuilder()
    .setDescription('Get one Pokemon by id!')
    .setAuth(false)
    .setParams({
        id: PokemonSchemata.pokemonIdSchema
    })
    .setResponses({
        200: {
            description: 'Sucess',
            schema: PokemonSchemata.pokemonSchema,
        }
    })
    .build();

server.route({
    method: 'GET',
    path: '/pokemons/{id}',
    handler:PokemonController.getPokemonId,
    config:getPokemonIdConfig
});

// Get pokemons infos
var getPokemonsListConfig = new RouteConfigBuilder()
    .setDescription('List of Pokemon')
    .setAuth(false)
    .setQuery({
        limit: PokemonSchemata.limitPokeQuerySchema,
        offset: PokemonSchemata.offsetQuerySchema
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: PokemonSchemata.multiplePokemonSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/pokemons',
    handler: PokemonController.getPokemons,
    config: getPokemonsListConfig
});

// Get pokemons types
var getPokemonsTypesListConfig = new RouteConfigBuilder()
    .setDescription('List of Pokemon types')
    .setAuth(false)
    .setQuery({
        limit: PokemonSchemata.limitPokeTypesQuerySchema,
        offset: PokemonSchemata.offsetQuerySchema
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: PokemonSchemata.multiplePokemonSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/pokemons/types',
    handler: PokemonController.getPokemonsTypes,
    config: getPokemonsTypesListConfig
});