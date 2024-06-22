const { Router } = require("express");
const ColorController = require("../controllers/colorController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");

const colorRouter = Router();

colorRouter.post("/", checkLogin, checkAdmin, ColorController.createColor);
colorRouter.get("/", ColorController.getColors);
colorRouter.get("/:id", ColorController.getColor);
colorRouter.delete(
  "/:id/delete",
  checkLogin,
  checkAdmin,
  ColorController.deleteColor
);

module.exports = colorRouter;
