const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;

var exports = module.exports = {};

var Bet = dataBase.define('bet', {

    battleId:{
        type: Sequelize.STRING,
        type:Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
    },

    trainerId: {
        type:Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
    },

    amount: {
        type:Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

Bet.sync();

exports.Bet = Bet;