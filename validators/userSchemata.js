const Joi = require('joi');

var exports = module.exports = {};
var userSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string()
});

exports.userSchema = userSchema;

exports.multipleUsersSchema = Joi.array().items(userSchema);