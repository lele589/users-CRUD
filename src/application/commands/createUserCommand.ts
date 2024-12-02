import UserService from "../../domain/userService";
import { User } from "../../types/User";
import { UserServiceTypes } from '../../types/UserService';

export interface CreateUserCommandTypes {
    execute(userData: User): User;
}

class CreateUserCommand implements CreateUserCommandTypes {
    private userService: UserServiceTypes;

    constructor(userService: UserServiceTypes) {
        this.userService = userService;
    }

    execute(userData: User): User {
        return this.userService.createUser(userData);
    }
}

export default CreateUserCommand;