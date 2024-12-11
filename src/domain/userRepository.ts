import { User } from "../types/User";

export type CreateUserResult = 
    | { success: true; data: string; error?: never }
    | { success: false; data?: never; error: string };

export interface UserRepository {
    createUser(userData: User): CreateUserResult;
    getUser(userId: User['id']): Promise<User>;
}