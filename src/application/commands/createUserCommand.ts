import UserService from "../../domain/userService";
import { User } from "../../types/User";
import { UserServiceInterface } from '../../domain/UserServiceInterface';

export interface CreateUserCommandInterface {
    execute(userData: User): Promise<User>;
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