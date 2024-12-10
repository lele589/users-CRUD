import { User } from "../types/User";

export interface UserServiceInterface {
    createUser(userData: User): Promise<User>;
    getUser(userId: User['id']): Promise<User>;
}