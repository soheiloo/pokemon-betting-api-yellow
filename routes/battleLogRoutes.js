const battleLogController = require('../controllers/battleLogController');
const battleLogSchemata = require('../validators/battleLogSchemata').battleLogSchema;
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;
const server = require('../config/server').server;
const Joi = require('joi');

var getBattleLogConfig = new RouteConfigBuilder()
    .setDescription('Get log for a specific battle by id')
    .setAuth(false)
    .setParams({
        id: Joi.number().integer()
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: battleLogSchemata
        }
    }).build();

server.route({
    method: 'GET',
    path: '/battleLogs/{id}',
    handler: battleLogController.getBattleLog,
    config: getBattleLogConfig
});