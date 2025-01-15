import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { UserEntity } from "./UserEntity";
import { UserModelInterface } from "./UserModelInterface";
import { UserRepository } from "./userRepository";

export class UserModel implements UserModelInterface {
        private userRepository;
        
        constructor(userRepository: UserRepository) {
            this.userRepository = userRepository;
        }
    
        createUser(userInstance: UserEntity) {
            const user = userInstance.toPrimitive();
            const userWithFullName = {id: user.id , name: `${user.firstName} ${user.lastName}`, email: user.email};
            return this.userRepository.createUser(userWithFullName);
        }
    
        findUser(userId: number) {
            const {success, data: userInstance} = this.userRepository.findUser(userId);
            if (!success) {
                return {success: false as const, error: 'User not found'};
            }

            return {success: true as const, data: userInstance.toPrimitive()};
        }
}