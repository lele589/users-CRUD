const express = require('express');
const bodyParser = require('body-parser');
const { setUserRoutes } = require('./infrastructure/in/userRoutes');
const UserService = require('./domain/userService');
const UserController = require('./infrastructure/in/userController');
const GetUserCommand = require('./application/commands/getUserCommand');
const CreateUserCommand = require('./application/commands/CreateUserCommand');
const inMemoryUserRepository = require('./infrastructure/out/repositories/inMemoryUserRepository');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRepository = new inMemoryUserRepository();
const userService = new UserService(userRepository);
const createUserCommand = new CreateUserCommand(userService);
const getUserCommand = new GetUserCommand(userService);
const userController = new UserController(createUserCommand, getUserCommand);

setUserRoutes(app, userController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;