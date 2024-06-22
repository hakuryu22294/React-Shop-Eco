const { Router } = require("express");
const CouponController = require("../controllers/couponController");
const { checkLogin, checkAdmin } = require("../middlewares/checkPermission");
const couponRouter = Router();

couponRouter.get("/", CouponController.getCoupons);
couponRouter.post("/", checkLogin, checkAdmin, CouponController.createCoupon);
couponRouter.get("/", CouponController.getCoupon);
couponRouter.put(
  "/update/:id",
  checkLogin,
  checkAdmin,
  CouponController.updateCoupon
);
couponRouter.delete(
  "/delete/:id",
  checkLogin,
  checkAdmin,
  CouponController.deleteCoupon
);

module.exports = couponRouter;
