import { UserEntity } from "../../domain/User/UserEntity";
import { UserModelInterface } from "../../domain/User/UserModelInterface";
import { FindUserTypes, ResultType } from "../../domain/User/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface FindUserCommandTypes {
    execute(userId: number): UserApplicationDTO;
}

class FindUserCommand implements FindUserCommandTypes {
    private userModel: UserModelInterface;

    constructor(userModel: UserModelInterface) {
        this.userModel = userModel;
    }

    execute(userId: number) {
        return this.userModel.findUser(userId);
    }
}

export default FindUserCommand;