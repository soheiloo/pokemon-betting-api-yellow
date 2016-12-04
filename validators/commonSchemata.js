const Joi = require('joi');

var exports = module.exports = {};

exports.databaseIdSchema = Joi.number().integer().positive();