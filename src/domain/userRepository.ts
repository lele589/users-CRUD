import { User } from "../types/User";

export interface UserRepository {
    createUser(userData: User): User;
    getUser(userId: User['id']): User | undefined;
}