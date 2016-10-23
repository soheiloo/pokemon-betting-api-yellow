const Sequelize = require('sequelize');
const Sqlite = require('sqlite3');

new Sqlite.Database('data');

var exports = module.exports = {};

var sequelize =
    new Sequelize('db', '', '',
        {
            dialect: 'sqlite',
            storage: 'data.sqlite',
            define: {
                timestamps: false
            }
        });

// uncomment if db should be dropped on launch
//sequelize.sync({force: true});

exports.dataBase = sequelize;