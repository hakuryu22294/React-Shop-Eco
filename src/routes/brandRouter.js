const { Router } = require("express");
const BrandController = require("../controllers/brandController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");
const brandRouter = Router();

brandRouter.post("/", checkLogin, checkAdmin, BrandController.createBrand);
brandRouter.get("/", BrandController.getBrands);
brandRouter.get("/:id", BrandController.getBrand);
brandRouter.put("/:id", checkLogin, checkAdmin, BrandController.updateBrand);
brandRouter.delete(
  "/:id/delete",
  checkLogin,
  checkAdmin,
  BrandController.deleteBrand
);

module.exports = brandRouter;
