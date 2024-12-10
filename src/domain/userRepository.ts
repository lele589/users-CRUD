import { User } from "../types/User";

export interface UserRepository {
    createUser(userData: User): Promise<User>;
    getUser(userId: User['id']): Promise<User>;
}