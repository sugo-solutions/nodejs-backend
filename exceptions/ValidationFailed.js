const format = require("util").format;

/**
 * Error class meant to be used for validation purposses
 *
 * @class ValidationFailedException
 * @extends {Error}
 */
class ValidationFailedException extends Error {
  /**
   *Creates an instance of ResourceNotFoundException.
   * @param {*} args
   * @memberof ValidationFailedException
   */
  constructor(message, errors) {
    super(message);
    this.status = 422;
    this.name = "ValidationFailedException";
    this.errors = errors;
  }

  getErrorString() {
    return format(
      "Name: %s Code: %s: status: %s --> errors: %j",
      this.name,
      this.code,
      this.message,
      this.errors
    );
  }

  /**
   * Defines how the app will react to an error. It should
   * return a error message, an error status, an identification
   * codename (or code) for the error and a error stack if we are
   * working in a development envoirment
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof ValidationFailedException
   */
  handle(req, res, next) {
    const status = this.status;
    const json = {
      status: status,
      code: this.name,
      message: this.message,
      errors: this.errors
    };
    if (process.env.NODE_ENV === "development") {
      json.traces = this.stack;
    }
    res.status(status).json(json);
  }
}

module.exports = ValidationFailedException;
