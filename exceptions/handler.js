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
    res.statusCode = json.status;
    res.end(JSON.stringify(json));
  }

  let responseString = `Response ${req.id}: ${req.method} ${
    req.path
  } ${err.status || err.statusCode}`;
  let errorString;
  let stackString;
  if (typeof err.getErrorString === "function") {
    errorString = err.getErrorString(req, res);
  } else {
    errorString = format(
      "Name: %s Code: %s - %d: %s",
      err.name,
      err.code,
      err.status || 500,
      err.message
    );
  }
  if (this.stack) {
    stackString = err.stack;
  }
  logger.error(`${responseString} --> ${errorString} ${stackString}`);
  next();
};

module.exports = errorHandler;
