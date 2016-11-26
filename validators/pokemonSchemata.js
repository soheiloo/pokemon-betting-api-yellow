const Joi = require('joi');

var exports = module.exports = {};

var pokemonTypeSchema = Joi.object({
	url: Joi.string(),
	id: Joi.number().integer().default(0),
	name: Joi.string()
});

var pokemonSpritesSchema = Joi.object({
	front_default: Joi.string().default('string'),
	back_dfault: Joi.string().default('string'),
	front_shiny: Joi.string().default('string'),
	back_shiny: Joi.string().default('string'),
});

var pokemonSchema = Joi.object({
    id: Joi.string(),
	//url: Joi.string(),
    name: Joi.string().default('string'),
    type_one: Joi.string().default('string'),
    //type_two: Joi.string().default('string'),
    height: Joi.number().integer().default(0),
    weight: Joi.number().integer().default(0),
    base_experience: Joi.number().integer().default(0),
    sprites: Joi.object()
});

var pokemonIdSchema = Joi.string()
    .required().description('The pokemon ID');

var limitPokeQuerySchema = Joi.number().integer()
    .required()
    .description('Limit a number of items (allowed range is 1-100)')
    .default(20)
    .min(1)
    .max(100);

var limitPokeTypesQuerySchema = Joi.number().integer()
    .required()
    .description('Limit a number of items (allowed range is 1-20), no more types')
    .default(1)
    .min(1)
    .max(20);

var offsetQuerySchema = Joi.number().integer()
    .required()
    .description('Number of items to skip minus one')
    .min(1)
    .default(1);
   

exports.pokemonSchema = pokemonSchema;
exports.pokemonIdSchema = pokemonIdSchema;
exports.limitPokeQuerySchema = limitPokeQuerySchema;
exports.limitPokeTypesQuerySchema = limitPokeTypesQuerySchema;
exports.offsetQuerySchema= offsetQuerySchema;
exports.multiplePokemonSchema = Joi.array().items(pokemonSchema);