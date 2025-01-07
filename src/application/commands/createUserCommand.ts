import { UserServiceInterface } from '../../domain/UserServiceInterface.js';
import { CreateUserTypes } from "../../domain/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface CreateUserCommandInterface {
    execute(userData: UserApplicationDTO): CreateUserTypes;
}

class CreateUserCommand implements CreateUserCommandInterface {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userData: UserApplicationDTO) {
        const userFullName = `${userData.firstName} ${userData.lastName}`;
        const user = {id: userData.id , name: userFullName, email: userData.email};
        return this.userService.createUser(user);
    }
}

export default CreateUserCommand;