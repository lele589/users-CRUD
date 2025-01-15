import { CreateUserCommandInterface } from "../../application/commands/createUserCommand.js";
import { FindUserCommandTypes } from "../../application/commands/findUserCommand.js";
import { Request, Response } from 'express';
import { UserControllerInterface } from "./UserControllerInterface";
import { UserControllerDTO } from "./types/UserControllerDTO.js";
import { ERRORS } from "../../errors.js";

class UserController implements UserControllerInterface {
    private createUserCommand: CreateUserCommandInterface;
    private findUserCommand: FindUserCommandTypes;

    constructor(createUserCommand: CreateUserCommandInterface, findUserCommand: FindUserCommandTypes) {
        this.createUserCommand = createUserCommand;
        this.findUserCommand = findUserCommand;
    }

    async createUser(req: Request<UserControllerDTO>, res: Response) {
        try {
            // TODO: validate contract
            const user = await this.createUserCommand.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async findUser(req: Request<{ id: string }>, res: Response) {
        // TODO: poner returns mejor
        try {
            const userId = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user = await this.findUserCommand.execute(userId);
            
            res.status(200).json(user);
        } catch (error) {
            switch ((error as Error).name) {
                case ERRORS.INFRASTRUCTURE.DATABASE_UNEXPECTED_ERROR:
                    res.status(503).json({ message: (error as Error).message });
                    break;
                case ERRORS.DOMAIN.USER_NOT_FOUND:
                    res.status(404).json({ message: (error as Error).message });
                    break;
                default:
                    res.status(500).json({ message: (error as Error).message });
            }
        }
    }
}

export default UserController;