const Bet = require('../models/bet').Bet;
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
        bets = _.map(bets, function (bet) {
            return {
                id: bet.id,
                battleId: bet.battleId,
                trainerId: bet.trainerId,
                amount: bet.amount
            }
        });
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
    battleClient.getBattle(payload.battleId).end(function(response){
        var battle = response.body;
        if (battle.id == undefined) {
            reply("Unknown battle.").code(404);
            return;
        }

        if(battle.end_time != undefined){
            reply("Cannot bet on a finished battle.").code(403);
            return;
        }

        if (battle.team1.trainer.id != payload.trainerId && battle.team2.trainer.id != payload.trainerId) {
            reply("Unknown trainer.").code(404);
            return;
        }

        var user = userController.getAuthenticatedUser(request, function (user) {
            if (user.balance <= payload.amount) {
                reply("Insufficient balance.").code(403);
                return;
            }

            Bet.create({
                battleId: payload.battleId,
                trainerId: payload.trainerId,
                amount: payload.amount
            }).then(function (bet) {
                reply(bet).code(201);
            });
        })
    });
};