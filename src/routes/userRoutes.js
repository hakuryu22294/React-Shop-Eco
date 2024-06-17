const { Router } = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/checkPermission");
const userRouter = Router();

userRouter.get(
  "/profile",
  authMiddleware.checkLogin,
  UserController.getUserProfile
);

userRouter.put(
  "update/shippingAddress",
  authMiddleware.checkLogin,
  UserController.updateShippingAddress
);

module.exports = userRouter;
