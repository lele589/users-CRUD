import express from 'express';
import bodyParser from 'body-parser';
import setUserRoutes from './infrastructure/in/userRoutes.js';
import { userController } from './infrastructure/container.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

setUserRoutes(app, userController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;