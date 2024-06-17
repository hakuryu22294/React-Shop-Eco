const { Router } = require("express");
const ColorController = require("../controllers/colorController");
const { checkLogin } = require("../middlewares/checkPermission");

const colorRouter = Router();

colorRouter.post("/", checkLogin, ColorController.createColor);
colorRouter.get("/", ColorController.getColors);
colorRouter.get("/:id", ColorController.getColor);
colorRouter.delete("/:id/delete", checkLogin, ColorController.deleteColor);

module.exports = colorRouter;
