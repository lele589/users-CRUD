import UserController from './in/userController.js';
import FindUserCommand from '../application/commands/findUserCommand.js';
import CreateUserCommand from '../application/commands/createUserCommand.js';
import SQLiteRepository from './out/repositories/SQLiteRepository.js';
import { UserModel } from '../domain/User/UserModel.js';

const userRepository = new SQLiteRepository();
const userModel = new UserModel(userRepository);
const createUserCommand = new CreateUserCommand(userModel);
const findUserCommand = new FindUserCommand(userModel);

export const userController = new UserController(createUserCommand, findUserCommand);