const Joi = require('joi');
const Server = require('../config/server');
const UserController = require('../controllers/userController');
const UserSchemata = require('../validators/userSchemata');

const server = Server.server;

// Get all users
var getUsersConfig = Server.createRouteConfig(
    'List all users',
    {
        200: {
            description: 'Success',
            schema: UserSchemata.multipleUsersSchema
        }
    }
);

server.route({
    method: 'GET',
    path: '/users',
    handler: UserController.getUsers,
    config: getUsersConfig
});

// Create new user
var createUserConfig = Server.createRouteConfigWithPayload(
    'Create new user',
    {
        username: Joi.string(),
        email: Joi.string(),
        password: Joi.string()
    },
    {
        201: {
            description: 'Created',
            schema: UserSchemata.userSchema
        }
    }
);
server.route({
    method: 'POST',
    path: '/users',
    handler: UserController.saveUser,
    config: createUserConfig
});