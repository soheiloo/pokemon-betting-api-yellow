const Joi = require('joi');

var exports = module.exports = {};

var battleLogSchema = Joi.object({
    text: Joi.string()
});

var liveBattleLogSchema = Joi.object({
    event_text: Joi.string()
});

exports.battleLogSchema = battleLogSchema;
exports.liveBattleLogSchema = liveBattleLogSchema;