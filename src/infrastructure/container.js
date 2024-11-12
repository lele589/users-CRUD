const UserService = require('./domain/userService');
const UserController = require('./infrastructure/in/userController');
const GetUserCommand = require('./application/commands/getUserCommand');
const CreateUserCommand = require('./application/commands/CreateUserCommand');
const inMemoryUserRepository = require('./infrastructure/out/repositories/inMemoryUserRepository');

const userRepository = new inMemoryUserRepository();
const userService = new UserService(userRepository);
const createUserCommand = new CreateUserCommand(userService);
const getUserCommand = new GetUserCommand(userService);

export const userController = new UserController(createUserCommand, getUserCommand);