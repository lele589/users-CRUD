import { UserEntity } from "../../domain/User/UserEntity";
import { UserModelInterface } from "../../domain/User/UserModelInterface";
import { FindUserTypes, ResultType } from "../../domain/User/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface FindUserCommandTypes {
    execute(userId: number): ResultType<UserApplicationDTO>;
}

class FindUserCommand implements FindUserCommandTypes {
    private userModel: UserModelInterface;

    constructor(userModel: UserModelInterface) {
        this.userModel = userModel;
    }

    execute(userId: number) {
        const { success, data: user } = this.userModel.findUser(userId);
        if(!success) {
            return { success: false as const, error: 'FindUserCommand - User not found' };
        }
        return { success: true as const, data: user };
    }
}

export default FindUserCommand;