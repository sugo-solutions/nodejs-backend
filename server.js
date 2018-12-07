const SuGoServer = require("./SuGoHttp/Server");

const server = new SuGoServer();

/**
 * MIDDLEWARE
 */
server.router
  .use(require("helmet")())
  .use(require("cors")())
  .use(require("compression")());

/**
 * ROUTES
 */
server.router.use("/", require("./routes"));

/**
 * Error Handler
 */
server.router.use(require("./exceptions/handler"));

module.exports = server;
