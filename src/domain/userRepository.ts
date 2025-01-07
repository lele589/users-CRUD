import { User } from "../infrastructure/out/types/User";

// Genéricos: T para types, E para errors
type ResultType<T> = 
    | { success: true; data: T; error?: never }
    | { success: false; data?: never; error: string };

export type CreateUserTypes = ResultType<User>;
export type FindUserTypes = ResultType<User>;
export type SearchUsersTypes = ResultType<User[]>;

export interface UserRepository {
    createUser(userData: User): CreateUserTypes;
    findUser(userId: User['id']): FindUserTypes;
    // searchUsers(): SearchUsersTypes;
}