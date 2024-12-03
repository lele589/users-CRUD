import { User } from "../../types/User";
import { UserServiceInterface } from "../../domain/UserServiceInterface";

export interface GetUserCommandTypes {
    execute(userId: User['id']): User | undefined;
}

class GetUserCommand implements GetUserCommandTypes {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    execute(userId: User['id']): User | undefined {
        return this.userService.getUser(userId);
    }
}

export default GetUserCommand;