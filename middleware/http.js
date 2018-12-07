const logger = require("../utils/logger");

const logRequest = (req, res, next) => {
  const now = new Date().toISOString();
  if (["GET", "OPTIONS", "HEAD"].includes(req.method)) {
    const { id, method, path, query } = req;
    logger.info(
      `${now}: Request ${id} ${method} ${path} --> query: ${JSON.stringify(
        query
      )}`
    );
  } else {
    const { id, method, path, body } = req;
    logger.info(
      `${now}: Request ${id} ${method} ${path} --> body: ${JSON.stringify(
        body
      )}`
    );
  }
  if (next) {
    next();
  }
};

const logResponse = (req, res, next) => {
  const now = new Date().toISOString();
  const { id, method, path, body } = req;
  const { statusCode, statusMessage } = res;
  logger.info(
    `${now}: Response ${id} ${method} ${path} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(
      body
    )}`
  );
  if (next) {
    next();
  }
};

const setRequestId = (req, res, next) => {
  req.id = Math.random()
    .toString(36)
    .substr(2);
  if (next) {
    next();
  }
};

module.exports = {
  logRequest,
  logResponse,
  setRequestId
};
