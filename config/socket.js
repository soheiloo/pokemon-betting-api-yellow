const io = require('socket.io-client');
const CronJob = require('cron').CronJob;
const BattleLog = require('../models/battleLog').BattleLog;
const BattleController = require('../controllers/battleController');
const BetController = require('../controllers/betController');
const messageBus = require('../config/messageBus').messageBus;

var socket;
var battleId;

function getNextFutureBattle(callback) {
    BattleController.getNextBattles(function (response) {
        for (var i = 0; i < response.length; i++) {
            var date = Date.parse(response[i].start_time);
            var now = Date.now();

            var difference = date - now;

            if (difference >= 0) {
                callback(response[i]);
                break;
            }
        }
    })
}

getNextFutureBattle(function (nextBattle) {
    battleId = nextBattle.id;
});

// start socket job
var job = new CronJob('00 9,19,29,39,49,59 * * * *', function () {
    if (socket != undefined) {
        socket.disconnect();
    }
    if(battleId != undefined){
        BetController.updateBetsAfterBattle(battleId);
    }
    getNextFutureBattle(function (nextBattle) {
        var nextBattleId = nextBattle.id;
        battleId = nextBattleId;
        socket = io('ws://pokemon-battle.bid/battles/' + nextBattleId);

        socket.on('connect_error', function () {
            console.log('Socket connect error for battle: ' + nextBattleId + '.');
        });

        socket.on('message', function (data) {
            // update long polling listeners
            messageBus.emit(nextBattleId, data);

            // save in db
            BattleLog.findOne({
                where: {
                    battle_id: nextBattleId
                }
            }).then(function (battleLog) {
                if (battleLog == undefined) {
                    BattleLog.create({
                        battle_id: nextBattleId,
                        text: data + '\n'
                    });
                } else {
                    battleLog.text = battleLog.text + data + '\n';
                    battleLog.save();
                }
            });
        });
    });
});
job.start();