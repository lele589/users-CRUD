import { Request, Response, Express } from 'express';
import { User } from "../../types/User";
import { UserControllerInterface } from './UserControllerInterface';

const setUserRoutes = (app: Express, userController: UserControllerInterface) => {
    app.post('/users', (req: Request<User>, res: Response) => userController.createUser(req, res));
    app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => userController.findUser(req, res));
};

export default setUserRoutes;