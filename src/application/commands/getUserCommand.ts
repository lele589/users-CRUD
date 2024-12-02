import { User } from "../../types/User";
import { UserServiceTypes } from "../../types/UserService";

export interface GetUserCommandTypes {
    execute(userId: User['id']): User | undefined;
}

class GetUserCommand implements GetUserCommandTypes {
    private userService: UserServiceTypes;

    constructor(userService: UserServiceTypes) {
        this.userService = userService;
    }

    execute(userId: User['id']): User | undefined {
        return this.userService.getUser(userId);
    }
}

export default GetUserCommand;