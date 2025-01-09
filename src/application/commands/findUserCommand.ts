import { UserEntity } from "../../domain/User/UserEntity";
import { UserModelInterface } from "../../domain/User/UserModelInterface";
import { FindUserTypes } from "../../domain/User/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface FindUserCommandTypes {
    execute(userId: number): FindUserTypes;
}

class FindUserCommand implements FindUserCommandTypes {
    private userModel: UserModelInterface;

    constructor(userModel: UserModelInterface) {
        this.userModel = userModel;
    }

    execute(userId: number) {
        const { success, data: user } = this.userModel.findUser(userId);
        if(!user) {
            return { success: false as const, error: 'User not found' };
        }
        return { success: true as const, data: user };
    }
}

export default FindUserCommand;