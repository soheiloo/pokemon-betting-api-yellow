const Joi = require('joi');

var exports = module.exports = {};

var betSchema = Joi.object({
    battleId: Joi.string().default(1),
    battleId: Joi.number().integer().positive().default(1),
    trainerId: Joi.number().integer().positive().default(1),
    amount: Joi.number().integer().positive().default(0)
});

var betIdSchema = Joi.string()
    .required().description('The Bet ID');

var betBattleIdQuerySchema = Joi.number()
	.integer()
	.positive()
	.required()
	.description('Post only if the battleId is a number member of not finished battle');

var betTrainerIdQuerySchema = Joi.number()
	.integer()
	.positive()
	.required()
	.description('Post only if the trainerId correspond to the selected battleId');

exports.betSchema = betSchema;
exports.betIdSchema = betIdSchema;
exports.betBattleIdQuerySchema = betBattleIdQuerySchema;
exports.betTrainerIdQuerySchema = betTrainerIdQuerySchema;
exports.multipleBetsSchema = Joi.array().items(betSchema);