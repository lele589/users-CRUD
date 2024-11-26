class GetUserCommand {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(userId) {
        return this.userService.getUser(userId);
    }
}

export default GetUserCommand;