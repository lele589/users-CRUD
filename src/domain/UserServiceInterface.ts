import { User } from "../types/User";
import { CreateUserResult } from "./userRepository";

export interface UserServiceInterface {
    createUser(userData: User): CreateUserResult;
    getUser(userId: User['id']): Promise<User>;
}