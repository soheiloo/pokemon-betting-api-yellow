const battleLogController = require('../controllers/battleLogController');
const battleLogSchemata = require('../validators/battleLogSchemata');
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;
const server = require('../config/server').server;
const Joi = require('joi');

var getBattleLogConfig = new RouteConfigBuilder()
    .setDescription('Get log for a specific battle by id')
    .setAuth(false)
    .setParams({
        battle_id: Joi.number().integer()
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: battleLogSchemata.battleLogSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/battleLogs/{battle_id}',
    handler: battleLogController.getBattleLog,
    config: getBattleLogConfig
});

var getLiveBattleLogConfig = new RouteConfigBuilder()
    .setDescription('Long poll the next live log element for the specific battle by id.')
    .setAuth(false)
    .setParams({
        battle_id: Joi.number().integer()
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: battleLogSchemata.liveBattleLogSchema
        }
    })
    .build();

server.route({
    method: 'GET',
    path: '/battleLogs/live/{battle_id}',
    handler: battleLogController.addNextEventListener, config: getLiveBattleLogConfig
});