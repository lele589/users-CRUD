class CreateUserCommand {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(userData) {
        return this.userService.createUser(userData);
    }
}

module.exports = CreateUserCommand;