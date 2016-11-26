const Bet = require('../models/bet').Bet;
const _ = require('underscore');
const battleClient = require('../config/battleClient');

var exports = module.exports = {};

exports.getBattles = function (request, reply) {
    var queryString = request.params.query_string;
    var pairs = queryString.split("&");

    var id = pairs.find(function (str) {
        return str.startsWith("id")
    });
    var lim = pairs.find(function (str) {
        return str.startsWith("limit")
    });
    var offs = pairs.find(function (str) {
        return str.startsWith("offset")
    });
    var isF = pairs.find(function (str) {
        return str.startsWith("is_finished")
    });

    var obj={};
    if(typeof id!=="undefined")
        obj["id"]=id.split("=")[1];
    if(typeof lim!=="undefined")
        obj["limit"]=lim.split("=")[1];
    if(typeof offs!=="undefined")
        obj["offset"]=offs.split("=")[1];
    if(typeof isF!=="undefined")
        obj["is_finished"]=isF.split("=")[1];

    //battleClient.getBattles({limit: lim.split("=")[1], offset: offs.split("=")[1], is_finished: isF.split("=")[1]})
    battleClient.getBattles(obj)
        .end(function (response) {
            reply(response.body).code(200);
        })
};

exports.getPots = function (request, reply) {
    var battleId = request.params.id;

    battleClient.getBattles({id: battleId})
        .end(function (response) {
            var tId1=response.body.team1.trainer.id;
            var tId2=response.body.team2.trainer.id;

            bets=Bet.findAll({where:{battleId:battleId}}).
                then(function(bets){
                    var pot1=0;
                    var pot2=0;

                    bets.forEach(function(bet){
                        if(bet.trainerId==tId1){
                            pot1+=bet.amount;
                        }
                        else if(bet.trainerId==tId2){
                            pot2+=bet.amount;
                        }
                    });

                    reply([{trainerId: tId1, pot: pot1},{trainerId: tId2, pot: pot2}]).code(200);
                });

            });
};