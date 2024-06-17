const { Router } = require("express");
const AuthController = require("../controllers/authControllers");
const authRouter = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);

module.exports = authRouter;
