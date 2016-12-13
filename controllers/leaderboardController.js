const Bet = require('../models/bet').Bet;
const BetStatus = require('../models/bet').BetStatus;
const User = require('../models/user').User;
const _ = require('underscore');
const Sequelize = require('sequelize');
const sequelize = require('../config/database').dataBase;
const battleClient = require('../config/battleClient');

var exports = module.exports = {};


exports.getLeaderboard = function (request, reply) {
    var bets = Bet.findAll({
        where:{status: BetStatus.WON},attributes:['User.username',[sequelize.fn('COUNT', sequelize.col('Bet.id')),'winning_bets']]
            ,group: ['user_id'],include:[User],order:[[sequelize.fn('COUNT', sequelize.col('Bet.id')),'DESC']]})
        .then(function (bets) {
            bets=_.map(bets, function(bet){
                return {
                    username: bet.user.dataValues.username,
                    winning_bets: bet.dataValues.winning_bets
                }
            });
            reply(bets).code(200);
        });
};

exports.getNextBattles = function (callback) {
    var opts={limit:5, offset:0, is_finished:false};
    battleClient.getBattles(opts).end(function (response) {
        callback(response.body);
    })
};