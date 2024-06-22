const Coupon = require("../models/CouponSchema");
const CustomApiError = require("../errors");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

class CouponController {
  createCoupon = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    //check if admin
    //check if coupon exists
    const couponExitst = await Coupon.findOne({ code });
    if (couponExitst)
      throw CustomApiError.BadRequestError("Coupon already exists");
    if (isNaN(discount))
      throw CustomApiError.BadRequestError("Discount must be a number");
    //create coupon
    const coupon = await Coupon.create({
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
      user: req.userAuthId,
    });
    res.status(StatusCodes.CREATED).json({
      message: "Coupon created successfully",
      coupon,
    });
  });

  getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    res.status(StatusCodes.OK).json({
      message: "Coupons fetched successfully",
      coupons,
    });
  });
  getCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    res.status(StatusCodes.OK).json({
      message: "Coupon fetched successfully",
      coupon,
    });
  });

  updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        code: code?.toUpperCase(),
        startDate,
        endDate,
        discount,
      },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).json({
      message: "Coupon updated successfully",

      coupon,
    });
  });

  deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
      message: "Coupon deleted successfully",
      coupon,
    });
  });
}

module.exports = new CouponController();
