const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;

var exports = module.exports = {};

var BattleLog = dataBase.define('battleLog', {
    text: Sequelize.TEXT
});

BattleLog.sync();

exports.BattleLog = BattleLog;