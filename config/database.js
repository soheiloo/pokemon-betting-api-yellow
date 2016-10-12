const Sequelize = require('sequelize');
const Sqlite = require('sqlite3');

new Sqlite.Database('data');

var exports = module.exports = {};

exports.dataBase = new Sequelize('db', '', '',
    {
        dialect: 'sqlite',
        storage: 'data.sqlite',
        define: {
            timestamps: false
        }
    });