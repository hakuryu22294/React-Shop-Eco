const jwt = require("jsonwebtoken");
const { JWT_LIFETIME, ONE_DAY } = require("../constanst/constanst");

require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return "token expired";
    }
    return decode;
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
