const Joi = require('joi');
const UserController = require('../controllers/userController');
const UserSchemata = require('../validators/userSchemata');
const server = require('../config/server').server;
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;

// Get all users
var getUsersConfig = new RouteConfigBuilder()
    .setDescription('List all users')
    .setResponses({
        200: {
            description: 'Success',
            schema: UserSchemata.multipleUsersSchema
        }
    }).build();

server.route({
    method: 'GET',
    path: '/users',
    handler: UserController.getUsers,
    config: getUsersConfig
});

// Create new user
var createUserConfig = new RouteConfigBuilder()
    .setDescription('Create new users')
    .setPayloadSchema({
        username: Joi.string(),
        email: Joi.string(),
        password: Joi.string()
    })
    .setResponses({
        201: {
            description: 'Created',
            schema: UserSchemata.userSchema
        }
    })
    .build();

server.route({
    method: 'POST',
    path: '/users',
    handler: UserController.saveUser,
    config: createUserConfig
});