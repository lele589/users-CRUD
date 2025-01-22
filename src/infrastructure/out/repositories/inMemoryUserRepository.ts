import { CreateUserTypes, FindUserTypes, UserRepository } from "../../../domain/User/userRepository";
import { User } from "../types/User";
import { DatabaseResponseEmptyError } from "./SQLiteRepository";
import { UserEntity } from "../../../domain/User/UserEntity";
import { UserApplicationDTO } from "../../../application/types/UserApplicationDTO";
import { EntityInterface } from "../../../domain/entityInterface";

// aquí podría ir el knex
class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    createUser(user: User): CreateUserTypes {
        try {
            this.users.push(user); // aqui faltaría gestionar que no puedas tener dos usuarios con el mismo id
            return { success: true, data: user };
        } catch (error) {
            // TODO: modelado de errores?
            return { success: false, error: 'Error creating user' };
        }
    }

    findUser(userId: number): FindUserTypes {
        return new Promise<EntityInterface<UserApplicationDTO>>((resolve, reject) => {
            try {
                const user = this.users.find(currentUser => currentUser.id === userId);
                if (!user) {
                    throw new DatabaseResponseEmptyError('Response empty', 'findUser');
                } else {
                    const userName = user.name.split(' ');
                    const userInstance = new UserEntity({
                        id: user.id,
                        firstName: userName[0],
                        lastName: userName[1],
                        email: user.email
                    });
                    resolve(userInstance);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default InMemoryUserRepository;