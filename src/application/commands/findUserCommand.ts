import { User } from "../../types/User";
import { UserServiceInterface } from "../../domain/UserServiceInterface.js";
import { FindUserTypes } from "../../domain/userRepository";

export interface FindUserCommandTypes {
    execute(userId: User['id']): FindUserTypes;
}

class FindUserCommand implements FindUserCommandTypes {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userId: User['id']) {
        return this.userService.findUser(userId);
    }
}

export default FindUserCommand;