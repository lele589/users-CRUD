import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { User } from "../../infrastructure/out/types/User";
import { EntityInterface } from "../entityInterface";

// Genéricos: T para types, E para errors
export type ResultType<T> =
    { success: true; data: T; error?: never }
    | { success: false; data?: never; error: string };

export type CreateUserTypes = ResultType<User>;
export type FindUserTypes = Promise<EntityInterface<UserApplicationDTO>>;
// export type SearchUsersTypes = ResultType<User[]>;

export interface UserRepository {
    createUser(userData: User): CreateUserTypes;
    findUser(userId: number): FindUserTypes;
    // searchUsers(): SearchUsersTypes;
}