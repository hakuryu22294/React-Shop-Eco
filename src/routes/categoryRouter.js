const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");
const upload = require("../config/fileUpload");
const categoryRouter = Router();
const { categoriesFolder } = require("../config/uploadFolder");
categoryRouter.post(
  "/",
  checkLogin,
  checkAdmin,
  categoriesFolder,
  upload.single("image"),
  categoryController.createCategory
);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategory);
categoryRouter.put(
  "/:id",
  checkLogin,
  checkAdmin,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/:id/delete",
  checkLogin,
  checkAdmin,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
