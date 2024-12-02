import { User } from "./User";

export interface UserServiceTypes {
    createUser(userData: User): User;
    getUser(userId: User['id']): User | undefined;
}