import UserService from '../domain/userService.js';
import UserController from './in/userController.js';
import GetUserCommand from '../application/commands/getUserCommand.js';
import CreateUserCommand from '../application/commands/CreateUserCommand.js';
import InMemoryUserRepository from './out/repositories/inMemoryUserRepository.js';

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const createUserCommand = new CreateUserCommand(userService);
const getUserCommand = new GetUserCommand(userService);

export const userController = new UserController(createUserCommand, getUserCommand);