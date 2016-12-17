const Joi = require('joi');
const BetController = require('../controllers/betController');
const BetSchemata = require('../validators/betSchemata');
const CommonSchemata = require('../validators/commonSchemata');
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
    .setPayloadSchema({
        amount: Joi.number().integer().positive(),
        battle_id: CommonSchemata.databaseIdSchema,
        trainer_id: CommonSchemata.databaseIdSchema
    })
    .setResponses({
        201: {
            description: 'Created',
            schema: BetSchemata.betSchema
        },
        403:{
            description: 'Insufficient balance for placing a bet or betting on a finished battle.'
        },
        404:{
            description: 'Battle or trainer not found.'
        }
    })
    .build();

//Post a new bet
server.route({
    method: 'POST',
    path: '/bets',
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