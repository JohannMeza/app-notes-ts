const UserRoute = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');

UserRoute.post("/", userController.index);
UserRoute.post("/register", userController.registerUser);
UserRoute.post("/login", userController.loginUser);
UserRoute.post("/access", [verifyToken, auth], userController.accessUser);

module.exports = UserRoute