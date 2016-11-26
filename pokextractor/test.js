var PokeXtractor = require("./pokeXtractor.js");
//var PokemonSchema = require("../validators/pokemonSchemata.js");
var P = new PokeXtractor();

//var pokeList = PokemonSchemata.multiplePokemonSchema;
var pokeList = [];
var pokeTypesList = [];

P.getPokemonFormByName(34)// with Promise
    .then(function(response) {
     // console.log(response.name);
    });

var interval = {
    limit: 20,
    offset: 1
  }


P.getTypesList(interval)
.then(function(responses) {
	for(var i = 0; i < interval.limit; i++){
		var id = interval.offset + i;
		if(id === 19){
			id = 1001;
		}
		if(id === 20){
			id = 1002;
		}

		pokeTypesList.push(
			{	
				id: id,
				url: responses.results[i].url,
				name: responses.results[i].name
			}
		);
	}
	//console.log(pokeTypesList);
})

P.getPokemonsList(interval)
.then(function(responses) {
	for(var i = 0; i < interval.limit; i++){
		pokeList.push(
			{	
				id: id,
				url: responses.results[i].url,
				name: responses.results[i].name
			}
		);
	}
 		//console.log(pokeList);	
});

P.getPokemonByName(4)// with Promise
 .then(function(response) {
 	var pokemonInfo = [];
 	pokemonInfo.push(
	 	{
	 		id: response.id,
	 		//url: response.pokemon.url,
	 		name: response.name,
	 		type_one: response.types[0].type.name,
	 		//type_two: response.types[1].type.name,
	 		height: response.height,
	 		weight: response.weight,
	 		base_experience: response.base_experience,
	 		sprites: {
	 			front_default: response.sprites.front_default,
	 			back_default: response.sprites.back_default,
	 			front_shiny: response.sprites.front_shiny,
	 			back_shiny: response.sprites.back_shiny
	 		}
	 	}
	);
	console.log(pokemonInfo);
});

