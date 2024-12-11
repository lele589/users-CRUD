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

    findUser(userId: User['id']) {
        return this.userRepository.findUser(userId);
    }
}

export default UserService;