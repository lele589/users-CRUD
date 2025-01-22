import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { User } from "../../infrastructure/out/types/User";
import { UserEntity } from "./UserEntity";
import { ResultType } from "./userRepository";

export interface UserModelInterface {
    createUser(userData: UserEntity): ResultType<User>;
    findUser(userId: number): Promise<UserApplicationDTO>;
}