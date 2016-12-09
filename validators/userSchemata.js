const Joi = require('joi');

var exports = module.exports = {};

var userSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string().default('password'),
    email: Joi.string().email().default('email@email.com'),
    balance: Joi.number().integer().default(0)

});

var userIdSchema = Joi.string()
    .required().description('The User ID');

var amountSchema = Joi.number()
    .positive()
    .integer()
    .required()
    .description('The amount to be withdrawn/deposited')
    .default(0);

var transactionSchema = Joi.object({
    user_id: userIdSchema,
    amount: Joi.number().integer(),
    type: Joi.string()
});

var transactionsSchema = Joi.array().items(transactionSchema);

exports.userSchema = userSchema;
exports.userIdSchema = userIdSchema;
exports.amountSchema = amountSchema;
exports.multipleUsersSchema = Joi.array().items(userSchema);
exports.transactionSchema = transactionSchema;
exports.transactionsSchema = transactionsSchema;
