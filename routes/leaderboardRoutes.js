//const battleLogController = require('../controllers/battleLogController');
const leaderboardSchemata = require('../validators/leaderboardSchemata');
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;
const server = require('../config/server').server;
const Joi = require('joi');

var getLeaderboardConfig = new RouteConfigBuilder()
    .setDescription('Get all users order by how many bets they won')
    .setAuth(false)
    .setResponses({
        200: {
            description: 'Success',
            schema: leaderboardSchemata.leaderboardSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/leaderboard',
    handler: battleLogController.getBattleLog,
    config: getLeaderboardConfig
});