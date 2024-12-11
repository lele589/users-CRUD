import UserService from '../domain/userService.js';
import UserController from './in/userController.js';
import FindUserCommand from '../application/commands/findUserCommand.js';
import CreateUserCommand from '../application/commands/createUserCommand.js';
// import InMemoryUserRepository from './out/repositories/inMemoryUserRepository.ts';
import SQLiteRepository from './out/repositories/SQLiteRepository.js';

const userRepository = new SQLiteRepository();
const userService = new UserService(userRepository);
const createUserCommand = new CreateUserCommand(userService);
const findUserCommand = new FindUserCommand(userService);

export const userController = new UserController(createUserCommand, findUserCommand);