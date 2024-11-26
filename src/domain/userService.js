class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData) {
        return this.userRepository.createUser(userData);
    }

    async getUser(userId) {
        return this.userRepository.getUser(userId);
    }
}

export default UserService;