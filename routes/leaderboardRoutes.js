const leaderboardController = require('../controllers/leaderboardController');
const leaderboardSchemata = require('../validators/leaderboardSchemata');
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;
const server = require('../config/server').server;
const Joi = require('joi');

var getLeaderboardConfig = new RouteConfigBuilder()
    .setDescription('Returns name and number of winning bets of each user. Ordered by number of wins. Users with no wins are ignored.')
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
    handler: leaderboardController.getLeaderboard,
    config: getLeaderboardConfig
});