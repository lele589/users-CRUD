import { User } from "../types/User";
import { CreateUserTypes, FindUserTypes } from "./userRepository";

export interface UserServiceInterface {
    createUser(userData: User): CreateUserTypes;
    findUser(userId: User['id']): FindUserTypes;
}