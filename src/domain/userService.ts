import { User } from "../types/User";
import { UserServiceTypes } from "../types/UserService";
import { UserRepository } from "./userRepository";

class UserService implements UserServiceTypes {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    createUser(userData: User) {
        return this.userRepository.createUser(userData);
    }

    getUser(userId: User['id']) {
        return this.userRepository.getUser(userId);
    }
}

export default UserService;