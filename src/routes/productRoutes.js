const { Router } = require("express");
const ProductController = require("../controllers/productController");
const { checkLogin } = require("../middlewares/checkPermission");
const productRouter = Router();

productRouter.post("/create", checkLogin, ProductController.createProduct);
productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);
productRouter.put("/:id", checkLogin, ProductController.updateProduct);
productRouter.delete(
  "/:id/delete",
  checkLogin,
  ProductController.deleteProduct
);

module.exports = productRouter;
