const userSchemata = require('../validators/userSchemata');
const User = require('../models/user').User;
const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;

var exports = module.exports = {};

var BetStatus = {
    RUNNING: 'running',
    WON: 'won',
    LOST: 'lost',
};
exports.BetStatus=BetStatus;

var Bet = dataBase.define('bet', {

    //user_id: userSchemata.userIdSchema,

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
        type: Sequelize.DataTypes.ENUM(BetStatus.RUNNING, BetStatus.WON, BetStatus.LOST),
        defaultValue: BetStatus.RUNNING,
        allowNull: false
    }
});
Bet.belongsTo(User, {foreignKey: 'user_id'});
//User.hasMany(Bet, {foreignKey: 'user_id'});

Bet.sync({force: true});

exports.Bet = Bet;