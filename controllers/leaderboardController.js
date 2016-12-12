const Bet = require('../models/bet').Bet;
const BetStatus = require('../models/bet').BetStatus;
const User = require('../models/user').User;
const _ = require('underscore');
const Sequelize = require('sequelize');
const sequelize = require('../config/database').dataBase;
const battleClient = require('../config/battleClient');

var exports = module.exports = {};


exports.getLeaderboard = function (request, reply) {
    var x=5;


                    User.create({username: 'A', email:'mail1'}).then(function(user){
                        User.create({username: 'B', email:'mail2'}).then(function(user){
                            Bet.create({battleId: 1, user_id:1,trainerId:1,status:BetStatus.WON,amount:5}).then(function(user){
                                Bet.create({battleId: 2, user_id:1,trainerId:1,status:BetStatus.WON,amount:5}).then(function(user){
                                    Bet.create({battleId: 3, user_id:1,trainerId:1,status:BetStatus.WON,amount:5}).then(function(user){
                                        Bet.create({battleId: 4, user_id:2,trainerId:1,status:BetStatus.WON,amount:5}).then(function(user){
                                            Bet.create({battleId: 5, user_id:2,trainerId:1,status:BetStatus.RUNNING,amount:5}).then(function(user){


                            var bets = Bet.findAll({
                                //attributes:['User.username',sequelize.fn('count', sequelize.col('bet_id'))],where:{status: BetStatus.WON},include: [User],group:["User.username"]})
                                // this works:::: where:{status: BetStatus.WON},attributes:['user_id',[sequelize.fn('COUNT', sequelize.col('id')),'betCount']],group: ['userId']})
                            where:{status: BetStatus.WON},attributes:['User.username',[sequelize.fn('COUNT', sequelize.col('Bet.id')),'betCount']],group: ['user_id'],include:[User]})
                            //attributes:['user_id',sequelize.fn('count', sequelize.col('status'))],where:{status: BetStatus.WON},group:["user_id"]})
                               .then(function (bets) {

                                    var pot1 = 0;
                                    var pot2 = 0;

                                    bets.forEach(function (bet) {
                                        if (bet.trainerId == tId1) {
                                            pot1 += bet.amount;
                                        }
                                        else if (bet.trainerId == tId2) {
                                            pot2 += bet.amount;
                                        }
                                    });

                                    reply([{trainerId: tId1, pot: pot1}, {trainerId: tId2, pot: pot2}]).code(200);
                                });


                            });
                        });
                    });
                });
            });
        });
    });
};

exports.getNextBattles = function (callback) {
    var opts={limit:5, offset:0, is_finished:false};
    battleClient.getBattles(opts).end(function (response) {
        callback(response.body);
    })
};