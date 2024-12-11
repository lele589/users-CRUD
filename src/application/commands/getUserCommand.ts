import { User } from "../../types/User";
import { UserServiceInterface } from "../../domain/UserServiceInterface.js";

export interface GetUserCommandTypes {
    execute(userId: User['id']): Promise<User>;
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