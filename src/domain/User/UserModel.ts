import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";
import { ERRORS } from "../../errors";
import { UserEntity } from "./UserEntity";
import { UserModelInterface } from "./UserModelInterface";
import { UserRepository } from "./userRepository";

// Example
// tambien se le puede pasar un parámetro cuando se llama al decorador, pero habría que modificar esta implementación
function validateJoiContract(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        // JOI Validation
        return originalMethod.apply(this, args);
    };
}

// Decorator (parecido a un middleware)
// - target: this??
// - methodName: nombre del método al que se le aplica el decorador
// - descriptor: (callbakc) objeto que contiene la propiedad value, que es el método al que se le aplica el decorador
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('methodName', methodName);
    console.log('descriptor', descriptor);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling method ${methodName} with arguments: ${args}`);
        return originalMethod.apply(this, args);
    };
}

class UserNotFoundError extends Error {
    constructor(message: string, scope: string) {
        super(message);
        this.name = ERRORS.DOMAIN.USER_NOT_FOUND;

        console.log(ERRORS.DOMAIN.USER_NOT_FOUND, { scope, message, layer: 'Domain' });
    }
}

export class UserModel implements UserModelInterface {
    private userRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    createUser(userInstance: UserEntity) {
        const user = userInstance.toPrimitive();
        const userWithFullName = { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email };
        return this.userRepository.createUser(userWithFullName);
    }

    @log
    async findUser(userId: number) {
        try {
            const userInstance = await this.userRepository.findUser(userId);
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