const { Router } = require("express");
const CategoryController = require("../controllers/categoryController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");
const upload = require("../config/fileUpload");
const categoryRouter = Router();
categoryRouter.post(
  "/",
  checkLogin,
  checkAdmin,
  upload.single("file"),
  CategoryController.createCategory
);
categoryRouter.get("/", CategoryController.getAllCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.put(
  "/:id",
  checkLogin,
  checkAdmin,
  CategoryController.updateCategory
);
categoryRouter.delete(
  "/:id/delete",
  checkLogin,
  checkAdmin,
  CategoryController.deleteCategory
);

module.exports = categoryRouter;
