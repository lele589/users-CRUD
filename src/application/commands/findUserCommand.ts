import { UserServiceInterface } from "../../domain/UserServiceInterface.js";
import { FindUserTypes } from "../../domain/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface FindUserCommandTypes {
    execute(userId: UserApplicationDTO['id']): FindUserTypes;
}

class FindUserCommand implements FindUserCommandTypes {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userId: UserApplicationDTO['id']) {
        return this.userService.findUser(userId);
    }
}

export default FindUserCommand;