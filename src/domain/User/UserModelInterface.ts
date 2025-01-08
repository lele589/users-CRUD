import { User } from "../../infrastructure/out/types/User";
import { UserEntity } from "./UserEntity";
import { CreateUserTypes, FindUserTypes } from "./userRepository";

export interface UserModelInterface {
    createUser(userData: UserEntity): CreateUserTypes;
    findUser(userId: number): FindUserTypes;
}