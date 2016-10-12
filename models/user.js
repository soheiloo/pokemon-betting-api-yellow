const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;

var exports = module.exports = {};

var User = dataBase.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING
});

User.sync();

exports.User = User;