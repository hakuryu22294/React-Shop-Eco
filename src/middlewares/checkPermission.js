const CustomError = require("../errors");
const { verifyToken } = require("../utils/jwt");
const User = require("../models/UserSchema");

const checkLogin = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  const decodeUser = verifyToken(token);
  if (!token) {
    throw new CustomError.UnAuthenticatedError("Authentication invalid");
  } else {
    req.userAuthId = decodeUser?.id;
    console.log(decodeUser?.id);
    next();
  }
};

const checkAdmin = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  if (user.role !== "admin") {
    next(CustomError.UnauthorizedError("Access Denided"));
  } else {
    next();
  }
};

module.exports = { checkLogin, checkAdmin };
