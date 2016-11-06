const Joi = require('joi');
const UserController = require('../controllers/userController');
const UserSchemata = require('../validators/userSchemata');
const server = require('../config/server').server;
const RouteConfigBuilder = require('../config/routeConfigBuilder').RouteConfigBuilder;

// Get all users
var getUsersConfig = new RouteConfigBuilder()
    .setDescription('List all users')
    .setAuth(false)
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

// Get one user
var getUserIdConfig = new RouteConfigBuilder()
    .setDescription('Get one user by id')
    .setAuth(false)
    .setParams({
        id: UserSchemata.userIdSchema
    })
    .setResponses({
        200: {
            description: 'Success',
            schema: UserSchemata.userSchema,
        }
    })
    .build();


server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.getUserId,
    config:getUserIdConfig
});

// Create new user
var createUserConfig = new RouteConfigBuilder()
    .setDescription('Create new users')
    .setAuth(false)
    .setPayloadSchema(UserSchemata.userSchema)
    .setResponses({
        201: {
            description: 'Created',
            schema: UserSchemata.userSchema
        }
    })
    .build();

//Post a new user
server.route({
    method: 'POST',
    path: '/users',
    handler: UserController.saveUser,
    config: createUserConfig
});

//Update a user based on it's id
var patchUserConfig = new RouteConfigBuilder()
    .setDescription('Udate a user based on it\'s id')
    .setAuth(false)
    .setParams({
        id: UserSchemata.userIdSchema
    })

    .setPayloadSchema(UserSchemata.userSchema)
    .setResponses({
        200:{
            description: 'Updated',
            schema: UserSchemata.userSchema
        }
    })
    .build();

server.route({
    method: 'PATCH',
    path: '/users/{id}',
    handler: UserController.updateUser,
    config: patchUserConfig
});