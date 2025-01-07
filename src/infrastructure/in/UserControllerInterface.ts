import { Request, Response } from 'express';
import { UserControllerDTO } from "./types/UserControllerDTO";

export interface UserControllerInterface {
    createUser(req: Request<UserControllerDTO>, res: Response): Promise<void>;
    findUser(req: Request<{ id: string }>, res: Response): Promise<void>;
}