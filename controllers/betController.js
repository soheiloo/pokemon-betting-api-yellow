const Bet = require('../models/bet').Bet;
const BetStatus = require('../models/bet').BetStatus;
const Transaction = require('../models/transaction').Transaction;
const TransactionType = require('../models/transaction').TransactionType;
const _ = require('underscore');
const auth = require('../config/auth');
const battleClient = require('../config/battleClient');
const userController = require('../controllers/userController');

var exports = module.exports = {};

function getNotFinishedBattles(queryString, callback) {
    var pairs = queryString.split("&");
    var isF = pairs.find(function (str) {
        return str.startsWith("is_finished")
    });
    var obj = {};
    if (typeof isF !== "undefined")
        obj["is_finished"] = isF.split("=")[1];
    battleClient.getBattles(obj)
        .end(function (response) {
            callback(response.body);
        })
}

exports.getBets = function (request, reply) {
    Bet.findAll().then(function (bets) {
        reply(bets).code(200);
    })
};

exports.getBetId = function (request, reply) {
    Bet.findById(request.params.id).then(function (bet) {
        reply(bet).code(200);
    })
};

exports.updateBet = function (request, reply) {
    Bet.findById(request.params.id).then(function (bet) {
        for (var attrName in request.payload) {
            bet[attrName] = request.payload[attrName];
        }
        bet.save();

        return reply(bet).code(200);
    })
};

exports.saveBet = function (request, reply) {
    var payload = request.payload;
    battleClient.getBattle(payload.battle_id).end(function (response) {
        var battle = response.body;
        if (battle.id == undefined) {
            reply("Unknown battle.").code(404);
            return;
        }

        if (battle.end_time != undefined) {
            reply("Cannot bet on a finished battle.").code(403);
            return;
        }

        if (battle.team1.trainer.id != payload.trainer_id && battle.team2.trainer.id != payload.trainer_id) {
            reply("Unknown trainer.").code(404);
            return;
        }

        userController.getAuthenticatedUser(request, function (user) {
            if (user.balance <= payload.amount) {
                reply("Insufficient balance.").code(403);
                return;
            }

            Transaction.create({
                user_id: user.id,
                amount: payload.amount,
                type: TransactionType.BET_COST
            }).then(function (transaction) {

                Bet.create({
                    user_id: user.id,
                    battleId: payload.battle_id,
                    trainerId: payload.trainer_id,
                    amount: payload.amount
                }).then(function (bet) {
                    user.balance = user.balance - payload.amount;
                    user.save().then(function () {
                        reply(bet).code(201);
                    });
                });

            });
        })
    });
};

exports.updateBetsAfterBattle = function (battleId) {
    battleClient.getBattle(battleId).end(function (response) {
        var battle = response.body;

        if(battle.winner == null){
            return;
        }
        var winnerId = battle.winner.trainer_id;

        if(winnerId != undefined){
            Bet.findAll({
                where: {
                    battleId: battleId
                }
            }).then(function (bets) {
                var winnerPot = 0;
                var loserPot = 0;

                _.each(bets, function(bet){
                    if(bet.trainerId == winnerId){
                        winnerPot += bet.amount;
                    }else{
                        loserPot += bet.amount;
                    }
                });

                _.each(bets, function(bet){
                    if(bet.trainerId == winnerId){
                        bet.status = BetStatus.WON;

                        var profit = Math.floor((winnerPot / loserPot + 1) * bet.amount);
                        Transaction.create({
                            user_id: bet.user_id,
                            amount: profit,
                            type: TransactionType.BET_PROFIT
                        });
                        userController.getUser(bet.user_id, function(user){
                            user.balance = user.balance + profit;
                            user.save();
                        })
                    }else{
                        bet.status = BetStatus.LOST;
                    }
                    bet.save();
                })
            });
        }
    });
};