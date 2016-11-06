const Joi = require('joi');

var exports = module.exports = {};
var battleSchema = Joi.object({
    end_time: Joi.string(),
    id: Joi.number().integer().positive(),
    start_time: Joi.string(),
    team1: Joi.object(),
    team2: Joi.object(),
    winner: Joi.object()
});

exports.battleSchema = battleSchema;

exports.multipleBattlesSchema = Joi.array().items(battleSchema);