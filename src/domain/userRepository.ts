import { User } from "../types/User";

export type CreateUserTypes = 
    | { success: true; data: string; error?: never }
    | { success: false; data?: never; error: string };

export type FindUserTypes =
    | { success: true; data: User; error?: never }
    | { success: false; data?: never; error: string };

export type SearchUsersTypes =
    | { success: true; data: User[] | []; error?: never }
    | { success: false; data?: never; error: string };

export interface UserRepository {
    createUser(userData: User): CreateUserTypes;
    findUser(userId: User['id']): FindUserTypes;
    searchUsers(): SearchUsersTypes;
}