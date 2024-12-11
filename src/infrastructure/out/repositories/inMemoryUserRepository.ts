import { resolve } from "node:dns";
import { CreateUserResult, UserRepository } from "../../../domain/userRepository";
import { User } from "../../../types/User";

// aquí podría ir el knex
class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    createUser(user: User): CreateUserResult {
        try {
            this.users.push(user);
            return { success: true, data: `User ${user.id} created` };
        } catch (error) {
            // TODO: modelado de errores?
            return { success: false, error: 'Error creating user' };
        }
    }

    getUser(userId: number) {
        return new Promise<User>((resolve, reject) => {
            try {
                const user = this.users.find(currentUser => currentUser.id === userId);
                if (!user) {
                    reject(new Error('Error getting user'));
                } else {
                    resolve(user);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default InMemoryUserRepository;