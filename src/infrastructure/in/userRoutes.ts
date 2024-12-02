import { Request, Response, Express } from 'express';
import { User } from "../../types/User";
import { UserControllerTypes } from "./userController";

const setUserRoutes = (app: Express, userController: UserControllerTypes) => {
    app.post('/users', (req: Request<User>, res: Response) => userController.createUser(req, res));
    app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => userController.getUser(req, res));
};

export default setUserRoutes;