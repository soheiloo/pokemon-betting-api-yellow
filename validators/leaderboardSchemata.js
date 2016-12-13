const Joi = require('joi');

var exports = module.exports = {};

var leaderboardEntrySchema = Joi.object({
    username: Joi.string(),
    winning_bets: Joi.number().integer().positive()
});

exports.leaderboardSchema = Joi.array().items(leaderboardEntrySchema);