const Joi = require('joi');

var exports = module.exports = {};

var battleLogSchema = Joi.object({
    text: Joi.string()
});


exports.battleLogSchema = battleLogSchema;