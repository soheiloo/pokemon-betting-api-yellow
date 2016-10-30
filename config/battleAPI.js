var unirest = require('unirest');

var toQueryString=function(obj){
    var queryString='';
    for(var propt in obj){
        queryString+=propt+'='+obj[propt]+'&';
    }
    if(queryString=='')
        return queryString;
    else{
        queryString=queryString.substring(0, queryString.length - 1);
        return '?'+queryString;
    }
}

//pokemon types routes
exports.pokemonTypes=function(opts){
    if(typeof opts==="undefined")
        opts={};

    return unirest.get("http://pokemon-battle.bid/api/v1/pokemon-types/"+toQueryString(opts))
        .headers({'Accept': 'application/json'});
};


//Trainer routes
exports.trainers=function(opts){
    if(typeof opts==="undefined")
        opts={};
    if(opts['id']){
        return unirest.get("http://pokemon-battle.bid/api/v1/trainers/"+opts.id)
            .headers({'Accept': 'application/json'});
    }
    else{
        return unirest.get("http://pokemon-battle.bid/api/v1/trainers/"+toQueryString(opts))
            .headers({'Accept': 'application/json'});
    }
};

//pokemon routes
exports.pokemons=function(opts){
    if(typeof opts==="undefined")
        opts={};
    if(opts['id']){
        return unirest.get("http://pokemon-battle.bid/api/v1/pokemons/"+opts.id)
            .headers({'Accept': 'application/json'});
    }
    else{
        return unirest.get("http://pokemon-battle.bid/api/v1/pokemons/"+toQueryString(opts))
            .headers({'Accept': 'application/json'});
    }
};

//battle routes
exports.battles=function(opts){
    if(typeof opts==="undefined")
        opts={};
    if(opts['id']){
        return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+opts.id)
            .headers({'Accept': 'application/json'});
    }
    else{
        return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+toQueryString(opts))
            .headers({'Accept': 'application/json'});
    }
};

exports.battleLocation=function(battleId){
    return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+battleId+"/location")
        .headers({'Accept': 'application/json'});
};

exports.battleTeams=function(battleId,teamNum){
    return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+battleId+"/team"+teamNum)
        .headers({'Accept': 'application/json'});
};

exports.battlePokemons=function(battleId,teamNum){
    return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+battleId+"/team"+teamNum+"/pokemons")
        .headers({'Accept': 'application/json'});
};

exports.battleTrainer=function(battleId,teamNum){
    return unirest.get("http://pokemon-battle.bid/api/v1/battles/"+battleId+"/team"+teamNum+"/trainer")
        .headers({'Accept': 'application/json'});
};

//example of how to use it
exports.battles({offset:1,limit:2,is_finished:false})
    .end(function (response){
        console.log(response.body);
    });
