const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const { checkLogin } = require("../middlewares/checkPermission");
const categoryRouter = Router();

categoryRouter.post("/", checkLogin, categoryController.createCategory);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategory);
categoryRouter.put("/:id", checkLogin, categoryController.updateCategory);
categoryRouter.delete(
  "/:id/delete",
  checkLogin,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
