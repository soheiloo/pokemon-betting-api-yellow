const Joi = require('joi');

var exports = module.exports = {};

var betSchema = Joi.object({
    battleId: Joi.number().integer().positive(),
    trainerId: Joi.number().integer().positive(),
    amount: Joi.number().integer().positive().default(0)
});

var betIdSchema = Joi.string()
    .required().description('The Bet ID');

exports.betSchema = betSchema;
exports.betIdSchema = betIdSchema;
exports.multipleBetsSchema = Joi.array().items(betSchema);