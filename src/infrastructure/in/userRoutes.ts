import { Request, Response, Express } from 'express';
import { UserControllerInterface } from './UserControllerInterface';
import { UserControllerDTO } from './types/UserControllerDTO';

const setUserRoutes = (app: Express, userController: UserControllerInterface) => {
    app.post('/users', (req: Request<UserControllerDTO>, res: Response) => userController.createUser(req, res));
    app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => userController.findUser(req, res));
};

export default setUserRoutes;