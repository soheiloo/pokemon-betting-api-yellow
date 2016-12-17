const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;
const userSchemata = require('../validators/userSchemata');

var exports = module.exports = {};

var TransactionType = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    BET_COST: 'betCost',
    BET_PROFIT: 'betProfit'
};

var Transaction = dataBase.define('transaction', {
    user_id: userSchemata.userIdSchema,
    amount: Sequelize.INTEGER,
    type: Sequelize.DataTypes.ENUM(TransactionType.DEPOSIT, TransactionType.WITHDRAWAL, TransactionType.BET_COST, TransactionType.BET_PROFIT)
});

Transaction.sync();

exports.Transaction = Transaction;
exports.TransactionType = TransactionType;