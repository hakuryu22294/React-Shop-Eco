const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./CustomApi");

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
