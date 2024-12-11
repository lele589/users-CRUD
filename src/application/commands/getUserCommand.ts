import { User } from "../../types/User";
import { UserServiceInterface } from "../../domain/UserServiceInterface.js";
import { GetUserResult } from "../../domain/userRepository";

export interface GetUserCommandTypes {
    execute(userId: User['id']): GetUserResult;
}

class GetUserCommand implements GetUserCommandTypes {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userId: User['id']) {
        return this.userService.getUser(userId);
    }
}

export default GetUserCommand;