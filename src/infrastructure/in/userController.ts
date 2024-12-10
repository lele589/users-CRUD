import { CreateUserCommandInterface } from "../../application/commands/createUserCommand";
import { GetUserCommandTypes } from "../../application/commands/getUserCommand";
import { User } from "../../types/User";
import { Request, Response } from 'express';
import { UserControllerInterface } from "./UserControllerInterface";

class UserController implements UserControllerInterface {
    private createUserCommand: CreateUserCommandInterface;
    private getUserCommand: GetUserCommandTypes;

    constructor(createUserCommand: CreateUserCommandInterface, getUserCommand: GetUserCommandTypes) {
        this.createUserCommand = createUserCommand;
        this.getUserCommand = getUserCommand;
    }

    async createUser(req: Request<User>, res: Response) {
        try {
            const user = await this.createUserCommand.execute(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    async getUser(req: Request<{ id: string }>, res: Response) {
        try {
            const userId = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user = await this.getUserCommand.execute(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }
}

export default UserController;