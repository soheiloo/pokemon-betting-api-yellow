const Joi = require('joi');

var exports = module.exports = {};

var leaderboardEntrySchema = Joi.object({
    trainerId: Joi.number().integer().positive(),
    trainerName: Joi.string(),
    wonBets: Joi.number().integer().positive()
});

var betIdSchema = Joi.string()
    .required().description('The Bet ID');

exports.leaderboardSchema = Joi.array().items(leaderboardEntrySchema);