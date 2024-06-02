const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./CustomApi");

class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthenticatedError;
