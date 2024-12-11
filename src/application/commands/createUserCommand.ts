import { User } from "../../types/User";
import { UserServiceInterface } from '../../domain/UserServiceInterface.js';
import { CreateUserResult } from "../../domain/userRepository";

export interface CreateUserCommandInterface {
    execute(userData: User): CreateUserResult;
}

class CreateUserCommand implements CreateUserCommandInterface {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userData: User) {
        return this.userService.createUser(userData);
    }
}

export default CreateUserCommand;