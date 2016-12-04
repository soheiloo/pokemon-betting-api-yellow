const Bet = require('../models/bet').Bet;
const _ = require('underscore');
const auth = require('../config/auth');
const battleClient = require('../config/battleClient');


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
                amount: bet.amount}
        });
        reply(bets).code(200);
    })
};

exports.getBetId = function(request, reply){
    Bet.findById(request.params.id).then(function(bet){
        reply(bet).code(200);
    })
};

exports.updateBet = function(request, reply){
    Bet.findById(request.params.id).then(function(bet){
       for(var attrName in request.payload){
            bet[attrName] = request.payload[attrName];
        }
        bet.save();
        
        return reply(bet).code(200);
    })
};

exports.saveBet = function (request, reply) {

    var payload = request.payload;
    battleClient.getBattle(payload.battleId, function(battle){
        if(battle == undefined){
            reply("Unknown battle").code(404);
            return;
        }

        if(battle.team1.trainer.id != payload.trainerId && battle.team2.trainer.id != payload.trainerId){
            reply("Unknown trainer").code(404);
            return;
        }

        var user =


    });

    getNotFinishedBattles(request.params.query_string, function(response){
        var battleId = request.query.battleId;
        var trainerId = request.query.trainerId;
        for(var i = 0; i < response.length; i++){
            if((response[i].id === battleId) && (response[i].team1.trainer.id === trainerId || response[i].team2.trainer.id === trainerId)){
                 Bet.create({
                    battleId: request.query.battleId,
                    trainerId: request.query.trainerId,
                    amount: request.payload.amount,
                })
                .then(function (bet) {
                    bet = {
                        id: bet.id,
                        battleId: request.query.battleId,
                        trainerId: request.query.trainerId,
                        amount: request.payload.amount,
                    };
                    reply(bet).code(201);
                })
            }
            if(response.length - 1 === i){
                reply(console.error("Put a right battle id or trainer id!"));         
            }

        }
    });
};