const Joi = require('joi');
const BetController = require('../controllers/betController');
const BetSchemata = require('../validators/betSchemata');
const server = require('../config/server').server;
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;

// Get all bets
var getBetsConfig = new RouteConfigBuilder()
    .setDescription('List all bets')
    .setAuth(false)
    .setResponses({
        200: {
            description: 'Success',
            schema: BetSchemata.multipleBetsSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/bets',
    handler: BetController.getBets,
    config: getBetsConfig
});

// Get one bet
var getBetIdConfig = new RouteConfigBuilder()
    .setDescription('Get one bet by id')
    .setAuth(false)
    .setParams({
        id: BetSchemata.betIdSchema
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: BetSchemata.betSchema,
        }
    })
    .build();


server.route({
    method: 'GET',
    path: '/bets/{id}',
    handler: BetController.getBetId,
    config:getBetIdConfig
});


// Create new bet
var createBetConfig = new RouteConfigBuilder()
    .setDescription('Create new bets')
    .setAuth(false)
    .setPayloadSchema({
        amount: Joi.number().integer().positive()

    })
    .setParams({
        query_string: Joi.string()
    })
    .setQuery({
        battleId: BetSchemata.betBattleIdQuerySchema,
        trainerId: BetSchemata.betTrainerIdQuerySchema
    })
    .setResponses({
        201: {
            description: 'Created',
            schema: BetSchemata.betSchema
        }
    })
    .build();

//Post a new bet
server.route({
    method: 'POST',
    path: '/bets/{query_string}/',
    handler: BetController.saveBet,
    config: createBetConfig
});

//Update a bet based on it's id
var patchBetConfig = new RouteConfigBuilder()
    .setDescription('Udate a bet based on it\'s id')
    .setAuth(false)
    .setParams({
        id: BetSchemata.betIdSchema
    })
    .setPayloadSchema(BetSchemata.betSchema)
    .setResponses({
        200:{
            description: 'Updated',
            schema: BetSchemata.betSchema
        }
    })
    .build();

server.route({
    method: 'PATCH',
    path: '/bets/{id}',
    handler: BetController.updateBet,
    config: patchBetConfig
});