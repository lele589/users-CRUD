import { CreateUserCommandInterface } from "../../application/commands/createUserCommand";
import { FindUserCommandTypes } from "../../application/commands/findUserCommand";
import { Request, Response } from 'express';
import { UserControllerInterface } from "./UserControllerInterface";
import { UserControllerDTO } from "./types/UserControllerDTO";
import { ERRORS } from "../../errors";
import { UserApplicationDTO } from "../../application/types/UserApplicationDTO";

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

    async findUser(req: Request<{ id: string }>, res: Response<UserApplicationDTO | { type: string }>) {
        // TODO: poner returns mejor
        try {
            const userId = Number(req.params.id); // Aqui podría ir JOI y la validación del contrato para que autotransforme el Id type
            const user = await this.findUserCommand.execute(userId);

            res.status(200).json(user);
        } catch (error) {
            switch ((error as Error).name) {
                case ERRORS.INFRASTRUCTURE.DATABASE_UNEXPECTED_ERROR:
                    // Aqui podría ser incluso un 500, pensar siempre que el frontend no tiene porque saber los errores concretos, sino solo aquellos en los que queramos que responda de un modo concreto
                    res.status(503).json({ type: 'ServiceUnavailable' });
                    break;
                case ERRORS.DOMAIN.USER_NOT_FOUND:
                    res.status(404).send();
                    break;
                default:
                    // loguear aqui o en otro lado para no perder la traza, pero el frontend no lo necesita tan explicito
                    res.status(500).send();
            }
        }
    }
}

export default UserController;