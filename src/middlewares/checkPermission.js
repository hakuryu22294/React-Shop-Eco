const CustomError = require("../errors");
const { verifyToken } = require("../utils/jwt");

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

module.exports = { checkLogin };
