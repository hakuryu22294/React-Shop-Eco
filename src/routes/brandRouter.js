const { Router } = require("express");
const BrandController = require("../controllers/brandController");
const { checkLogin } = require("../middlewares/checkPermission");
const brandRouter = Router();

brandRouter.post("/", checkLogin, BrandController.createBrand);
brandRouter.get("/", BrandController.getBrands);
brandRouter.get("/:id", BrandController.getBrand);
brandRouter.put("/:id", checkLogin, BrandController.updateBrand);
brandRouter.delete("/:id/delete", checkLogin, BrandController.deleteBrand);

module.exports = brandRouter;
