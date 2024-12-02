import { CreateUserCommandTypes } from "../../application/commands/createUserCommand";
import { GetUserCommandTypes } from "../../application/commands/getUserCommand";
import { User } from "../../types/User";
import { Request, Response } from 'express';

export interface UserControllerTypes {
    createUser(req: Request<User>, res: Response): Response | void;
    getUser(req: Request<{ id: string }>, res: Response): Response | void;
}

class UserController implements UserControllerTypes {
    private createUserCommand: CreateUserCommandTypes;
    private getUserCommand: GetUserCommandTypes;

    constructor(createUserCommand: CreateUserCommandTypes, getUserCommand: GetUserCommandTypes) {
        this.createUserCommand = createUserCommand;
        this.getUserCommand = getUserCommand;
    }

    createUser(req: Request<User>, res: Response): Response | void {
        try {
            // TODO: es necesario tipar las variables locales?
            const user: User = this.createUserCommand.execute(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    getUser(req: Request<{ id: string }>, res: Response): Response | void {
        try {
            const userId: number = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user: User | undefined = this.getUserCommand.execute(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

export default UserController;