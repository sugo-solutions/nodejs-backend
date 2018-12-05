const http = require("http"),
  finalhandler = require("finalhandler"),
  Router = require("router"),
  logger = console,
  router = new Router(),
  { setRequestId, logRequest, logResponse } = require("./middleware/http");

/**
 * SERVER CREATION
 */
const server = http.createServer((req, res) => {
  const [path, querystring] = req.url.split("?");
  req.path = path;
  req.query = require("querystring").parse(querystring) || {};
  router(req, res, finalhandler(req, res));
});

/**
 * SERVER EVENTS
 */
server.on("close", () => {
  logger.log("The connection has been closed!");
});
server.on("error", err => {
  logger.error(
    `An error has ocurred --> ${err.name} ${err.message} ${err.stack}`
  );
});
server.on("listening", () => {
  logger.log(`Listening on port "${server.address().port}"`);
});

/**
 * MIDDLEWARE
 */
router
  .use(require("helmet")())
  .use(require("cors")())
  .use(require("compression")())
  .use(require("body-parser").json())
  .use(setRequestId)
  .use(logRequest);

/**
 * ROUTES
 */
router.use("/", require("./routes"));

/**
 * RESPONSE LOGGING
 *
 * Must be at the end so it has access to the response
 * body
 */
router.use(logResponse);

/**
 * Error Handler
 */
router.use(require("./exceptions/handler"));

module.exports = server;
