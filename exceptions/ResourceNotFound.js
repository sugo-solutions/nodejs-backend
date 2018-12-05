const format = require("util").format;

/**
 * Example Class for demostrating the error handler logic
 *
 * @class ResourceNotFoundException
 * @extends {Error}
 */
class ResourceNotFoundException extends Error {
  /**
   *Creates an instance of ResourceNotFoundException.
   * @param {*} args
   * @memberof ResourceNotFoundException
   */
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = "ResourceNotFoundException";
  }

  getErrorString() {
    return format(
      "Name: %s status: %s message: %s",
      this.code || this.name,
      this.status,
      this.message
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
   * @memberof ResourceNotFoundException
   */
  handle(req, res, next) {
    const status = this.status;
    const json = {
      status: status,
      code: this.code || this.name,
      message: this.message,
      mongoError: this.mongoError
    };
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      json.traces = this.stack;
    }
    res.statusCode = status;
    res.end(JSON.stringify(json));
    return res;
  }
}

module.exports = ResourceNotFoundException;
