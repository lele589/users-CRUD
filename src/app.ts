import express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';
import setUserRoutes from './infrastructure/in/userRoutes';
import { userController } from './infrastructure/container';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

setUserRoutes(app, userController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;