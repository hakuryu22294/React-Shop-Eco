const User = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const checkEmailAlreadyExists = await User.findOne({ email });
  if (checkEmailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create(req.body);
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({
    user,
    msg: "Register successfully",
  });
};

const login = async (req, res) => {
  res.send("Login");
};

const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
