import { CreateUserCommandInterface } from "../../application/commands/createUserCommand.js";
import { FindUserCommandTypes } from "../../application/commands/findUserCommand.js";
import { User } from "../../types/User";
import { Request, Response } from 'express';
import { UserControllerInterface } from "./UserControllerInterface";

class UserController implements UserControllerInterface {
    private createUserCommand: CreateUserCommandInterface;
    private findUserCommand: FindUserCommandTypes;

    constructor(createUserCommand: CreateUserCommandInterface, findUserCommand: FindUserCommandTypes) {
        this.createUserCommand = createUserCommand;
        this.findUserCommand = findUserCommand;
    }

    async createUser(req: Request<User>, res: Response) {
        try {
            const user = await this.createUserCommand.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findUser(req: Request<{ id: string }>, res: Response) {
        try {
            const userId = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user = await this.findUserCommand.execute(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

export default UserController;