const UnAuthenticatedError = require("./UnAuthenticated");
const NotFoundError = require("./NotFound");
const CustomApiError = require("./CustomApi");
const BadRequestError = require("./badRequest");
const UnauthorizedError = require("./Unauthorized");

module.exports = {
  UnAuthenticatedError,
  NotFoundError,
  CustomApiError,
  BadRequestError,
  UnauthorizedError,
};
