const { Router } = require("express");
const authRouter = Router();
const { login, logout, register } = require("../controllers/authController");

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", logout);

module.exports = authRouter;
