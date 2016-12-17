const Bet = require('../models/bet').Bet;
const _ = require('underscore');
const battleClient = require('../config/battleClient');

var exports = module.exports = {};


exports.getPots = function (request, reply) {
    var battleId = request.params.id;

    battleClient.getBattles({id: battleId})
        .end(function (response) {
            var tId1 = response.body.team1.trainer.id;
            var tId2 = response.body.team2.trainer.id;

            bets = Bet.findAll({where: {battleId: battleId}}).then(function (bets) {
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
};

exports.getNextBattles = function (callback) {
    var opts={limit:5, offset:0, is_finished:false};
    battleClient.getBattles(opts).end(function (response) {
        callback(response.body);
    })
};