const BattleController = require('../controllers/battleController');
const BattleSchemata = require('../validators/battleSchemata');
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;
const server = require('../config/server').server;
const Joi = require('joi');

var getBattlesConfig = new RouteConfigBuilder()
    .setDescription('Get battles from BattleAPI')
    .setAuth(false)
    .setParams({
        query_string: Joi.string()
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: BattleSchemata.multipleBattlesSchema
        }
    }).build();

var getPotsConfig = new RouteConfigBuilder()
    .setDescription('Get Pots for a battle')
    .setAuth(false)
    .setParams({
        id: Joi.number().integer().positive()
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: BattleSchemata.battlePots
        }
    }).build();

server.route({
    method: 'GET',
    path: '/battles/{query_string}',
    handler: BattleController.getBattles,
    config: getBattlesConfig
});

server.route({
    method: 'GET',
    path: '/battle/{id}/pots',
    handler: BattleController.getPots,
    config: getPotsConfig
});