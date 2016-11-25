const io = require('socket.io-client');
const CronJob = require('cron').CronJob;
const BattleLog = require('../models/battleLog').BattleLog;
const BattleController = require('../controllers/battleController');

var socket;

// start socket job
var job = new CronJob('00 9,19,29,39,49,59 * * * *', function(){
    console.log('cron job started');
    if(socket != undefined){
        socket.disconnect();
    }
    BattleController.getNextBattle(function(nextBattle){
        var nextBattleId = nextBattle.id;
        console.log('Next battle has id: ' + nextBattleId);

        socket = io('ws://pokemon-battle.bid/battles/' + nextBattleId);

        socket.on('connect', function(){
            console.log('Connected.')
        });

        socket.on('connect_error', function(){
            console.log('Socket connect error');
        });

        socket.on('message', function(data){
            console.log('Received message: ' + data);
            BattleLog.findById(nextBattleId).then(function(battleLog){
                if(battleLog == undefined){
                    BattleLog.create({
                        text: data + '\n'
                    });
                }else{
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