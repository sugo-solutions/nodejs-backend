const logger = require("../utils/logger"),
  { format } = require("util");

const errorHandler = (err, req, res, next) => {
  /* If the error object has a handle method we use it */
  if (typeof err.handle === "function") {
    err.handle(req, res);
  } else {
    const json = {
      status: err.status || 500,
      name: err.name || err.constructor.name,
      code: err.code || "N/A",
      message: err.message || "Unexpected Error"
    };
    if (this.stack) {
      json.stack = err.stack;
    }
    res.status(json.status).json(json);
  }
};

module.exports = errorHandler;
