const BattleLog = require('../models/battleLog').BattleLog;
const _ = require('underscore');

const defaultText = 'No battle log found.';

var exports = module.exports = {};

exports.getBattleLog = function (request, reply) {
    BattleLog.findOne({
        where: {
            battle_id: request.params.battle_id
        }
    }).then(function (battleLog) {
        if (battleLog == undefined) {
            battleLog = {text: defaultText};
        }
        reply(battleLog).code(200);
    });
};