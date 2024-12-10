import UserService from '../domain/userService';
import UserController from './in/userController';
import GetUserCommand from '../application/commands/getUserCommand';
import CreateUserCommand from '../application/commands/createUserCommand';
// import InMemoryUserRepository from './out/repositories/inMemoryUserRepository.ts';
import SQLiteRepository from './out/repositories/SQLiteRepository';

const userRepository = new SQLiteRepository();
const userService = new UserService(userRepository);
const createUserCommand = new CreateUserCommand(userService);
const getUserCommand = new GetUserCommand(userService);

export const userController = new UserController(createUserCommand, getUserCommand);