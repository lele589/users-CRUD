class CreateUserCommand {
    constructor(userService) {
        this.userService = userService;
    }

    execute(userData) {
        return this.userService.createUser(userData);
    }
}

export default CreateUserCommand;