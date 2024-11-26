class UserController {
    constructor(createUserCommand, getUserCommand) {
        this.createUserCommand = createUserCommand;
        this.getUserCommand = getUserCommand;
    }

    async createUser(req, res) {
        try {
            const user = await this.createUserCommand.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const userId = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user = await this.getUserCommand.execute(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default UserController;