import { User } from "../types/User";
import { UserServiceInterface } from "./UserServiceInterface";
import { UserRepository } from "./userRepository.js";

class UserService implements UserServiceInterface {
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