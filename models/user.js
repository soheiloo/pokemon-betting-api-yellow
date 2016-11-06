const Sequelize = require('sequelize');
const dataBase = require('../config/database').dataBase;

var exports = module.exports = {};

var User = dataBase.define('user', {

    username:{ 
    	type: Sequelize.STRING,
    	//can be good for later
    	//unique: true,
    	//user name required
    	allowNull: false
    },

    password: {
    	type: Sequelize.STRING,
    	defaultValue: 'password',
    	allowNull: false
    },

    email: {
    	type: Sequelize.STRING,
    	defaultValue: 'email@email.com',
    	allowNull: false
    },

    balance: {
    	type:Sequelize.INTEGER,
    	defaultValue: 0,
    	allowNull: false
    }
});

User.sync();

exports.User = User;