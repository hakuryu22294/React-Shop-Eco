const asyncHandler = require("express-async-handler");
const User = require("../models/UserSchema");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { generateToken } = require("../utils/jwt");

class AuthController {
  registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return next(
        new CustomError.CustomApiError(
          "Please provide email and password",
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      role,
    });
    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "User created successfully",
      user: {
        name: user.name ? user.name : user.email,
        email: user.email,
        role: user.role,
      },
    });
  });

  loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new CustomError.CustomApiError(
          "Please provide email and password",
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(
        new CustomError.CustomApiError(
          "Incorrect email or password",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    const token = generateToken(user._id);
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "User logged in successfully",
      accessToken: token,
      user: {
        name: user.name ? user.name : user.email,
        email: user.email,
        role: user.role,
        
      },
    });
  });
}

module.exports = new AuthController();
