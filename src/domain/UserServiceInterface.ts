import { User } from "../infrastructure/out/types/User";
import { CreateUserTypes, FindUserTypes } from "./userRepository";

export interface UserServiceInterface {
    createUser(userData: User): CreateUserTypes;
    findUser(userId: User['id']): FindUserTypes;
}