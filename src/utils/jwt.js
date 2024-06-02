const jwt = require("jsonwebtoken");
const { JWT_LIFETIME, ONE_DAY } = require("../constanst/constanst");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
  console.log("token", token);
};

const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

module.exports = { createJWT, isValidToken, attachCookiesToResponse };
