import { User } from "../types/User";
import { CreateUserResult, GetUserResult } from "./userRepository";

export interface UserServiceInterface {
    createUser(userData: User): CreateUserResult;
    getUser(userId: User['id']): GetUserResult;
}