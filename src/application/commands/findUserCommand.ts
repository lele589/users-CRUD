import { UserModelInterface } from "../../domain/User/UserModelInterface";
import { UserApplicationDTO } from "../types/UserApplicationDTO";

export interface FindUserCommandTypes {
    execute(userId: number): Promise<UserApplicationDTO>;
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