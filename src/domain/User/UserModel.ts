import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { ERRORS } from "../../errors";
import { UserEntity } from "./UserEntity";
import { UserModelInterface } from "./UserModelInterface";
import { UserRepository } from "./userRepository";

class UserNotFoundError extends Error {
    constructor(message: string, scope: string) {
        super(message);
        this.name = ERRORS.DOMAIN.USER_NOT_FOUND;

        console.log(ERRORS.DOMAIN.USER_NOT_FOUND, {scope, message, layer: 'Domain'});
    }
}

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
           try {
             const userInstance = this.userRepository.findUser(userId);
             return userInstance.toPrimitive();
           } catch (error) {
            console.log('switch', error.name);
            switch ((error as Error).name) {
                case ERRORS.INFRASTRUCTURE.DATABASE_RESPONSE_EMPTY_ERROR:
                    console.log('CASE', error.name);
                    throw new UserNotFoundError('User not found', 'findUser');
                default:
                    throw error; // revisar si funciona
            }
           }
        }
}