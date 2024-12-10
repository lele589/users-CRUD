import { UserRepository } from "../../../domain/userRepository";
import { User } from "../../../types/User";

// aquí podría ir el knex
class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    createUser(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            try {
            this.users.push(user);
            resolve(user);
            } catch (error) {
            reject(error);
            }
        });
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