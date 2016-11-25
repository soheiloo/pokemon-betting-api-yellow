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
    console.log('cron job started');
    if (socket != undefined) {
        socket.disconnect();
    }
    getNextFutureBattle(function (nextBattle) {
        var nextBattleId = nextBattle.id;
        console.log('Next battle has id: ' + nextBattleId);

        socket = io('ws://pokemon-battle.bid/battles/' + nextBattleId);

        socket.on('connect', function () {
            console.log('Connected.')
        });

        socket.on('connect_error', function () {
            console.log('Socket connect error');
        });

        socket.on('message', function (data) {
            console.log('Received message: ' + data);
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
                console.log('Updated battle log with data ' + data + '.');
            });
        });
    });

    var nextBattle
});
job.start();
console.log('Setup cron job.');