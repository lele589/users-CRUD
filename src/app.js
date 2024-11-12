const express = require('express');
const bodyParser = require('body-parser');
const { setUserRoutes } = require('./infrastructure/in/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

setUserRoutes(app, userController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;