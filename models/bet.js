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
    },

    status: {
        type:Sequelize.ENUM,
        values:['running','won','lost'],
        defaultValue: 'running',
        allowNull: false
    }
});

Bet.sync();

Bet.build({battleId: 1, userId:1});
Bet.build({battleId: 2, userId:1});
Bet.build({battleId: 3, userId:1});
Bet.build({battleId: 4, userId:2});


exports.Bet = Bet;