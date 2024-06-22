const User = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
class UserController {
  getUserProfile = asyncHandler(async (req, res) => {
    // const token = getTokenFromHeader(req);
    // const verified = verifyToken(token);
    // res.json({
    //   status: "success",
    //   message: "User profile",
    // });
    const user = await User.findById(req.userAuthId).populate("orders");
    res.status(StatusCodes.OK).json({
      message: "User profile",
      user,
    });
  });
  updateShippingAddress = asyncHandler(async (req, res) => {
    const { firstName, lastName, address, city, country, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userAuthId,
      {
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          country,
          phone,
        },
        hasShippingAddress: true,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "Shipping address updated successfully",
      user,
    });
  });
}

module.exports = new UserController();
