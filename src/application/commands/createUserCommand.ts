import { UserEntity } from '../../domain/User/UserEntity';
import { CreateUserTypes } from "../../domain/User/userRepository";
import { UserApplicationDTO } from "../types/UserApplicationDTO";
import { UserModelInterface } from "../../domain/User/UserModelInterface";

export interface CreateUserCommandInterface {
    execute(userData: UserApplicationDTO): CreateUserTypes;
}

class CreateUserCommand implements CreateUserCommandInterface {
    private userModel: UserModelInterface;

    constructor(userModel: UserModelInterface) {
        this.userModel = userModel;
    }

    execute(userData: UserApplicationDTO) {
        const newUserInstance = new UserEntity(userData);
        return this.userModel.createUser(newUserInstance);
    }
}

export default CreateUserCommand;