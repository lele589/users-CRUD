const setUserRoutes = (app, userController) => {
    app.post('/users', (req, res) => userController.createUser(req, res));
    app.get('/users/:id', (req, res) => userController.getUser(req, res));
};

export default setUserRoutes;