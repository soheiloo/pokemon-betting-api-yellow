const io = require('socket.io-client');
const CronJob = require('cron').CronJob;
const BattleLog = require('../models/battleLog').BattleLog;
const BattleController = require('../controllers/battleController');

var socket;

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

// start socket job
var job = new CronJob('00 9,19,29,39,49,59 * * * *', function () {
    if (socket != undefined) {
        socket.disconnect();
    }
    getNextFutureBattle(function (nextBattle) {
        var nextBattleId = nextBattle.id;
        socket = io('ws://pokemon-battle.bid/battles/' + nextBattleId);

        socket.on('connect_error', function () {
            console.log('Socket connect error for battle: ' + nextBattleId + '.');
        });

        socket.on('message', function (data) {
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

    var nextBattle
});
job.start();