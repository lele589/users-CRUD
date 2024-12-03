import { User } from "../types/User";

export interface UserServiceInterface {
    createUser(userData: User): User;
    getUser(userId: User['id']): User | undefined;
}