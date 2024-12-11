import { User } from "../../types/User";
import { Request, Response } from 'express';

export interface UserControllerInterface {
    createUser(req: Request<User>, res: Response): Promise<void>;
    getUser(req: Request<{ id: string }>, res: Response): Promise<void>;
}