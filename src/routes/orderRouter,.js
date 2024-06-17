const { Router } = require("express");
const orderController = require("../controllers/ordercontroller");
const { checkLogin } = require("../middlewares/checkPermission");
const orderRouter = Router();
orderRouter.post("/", checkLogin, orderController.createOrder);
module.exports = orderRouter;
