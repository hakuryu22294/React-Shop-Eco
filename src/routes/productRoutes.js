const { Router } = require("express");
const ProductController = require("../controllers/productController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");
const { productsFolder } = require("../config/uploadFolder");
const upload = require("../config/fileUpload");

const productRouter = Router();

productRouter.post(
  "/create",
  checkLogin,
  checkAdmin,
  productsFolder,
  upload.single("file"),
  ProductController.createProduct
);
productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);
productRouter.put(
  "/:id",
  checkLogin,
  checkAdmin,
  ProductController.updateProduct
);
productRouter.delete(
  "/:id/delete",
  checkLogin,
  checkAdmin,
  ProductController.deleteProduct
);

module.exports = productRouter;
