import { UserRepository } from "../../../domain/userRepository";
import { User } from "../../../types/User";

// aquí podría ir el knex
class InMemoryUserRepository implements UserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    getUser(userId: number): User | undefined {
        const user = this.users.find(currentUser => currentUser.id === userId);
        return user;
    }
}

export default InMemoryUserRepository;