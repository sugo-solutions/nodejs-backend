const http = require("http"),
  finalhandler = require("finalhandler"),
  Router = require("router"),
  logger = console,
  router = new Router(),
  qs = require("querystring");

http.ServerResponse.prototype.status = function(code) {
  this.statusCode = code;
  return this;
};

http.ServerResponse.prototype.json = function(data) {
  this.body = data;
  this.end(JSON.stringify(this.body));
  return this;
};

/**
 * SERVER CREATION
 */
const server = http.createServer((req, res) => {
  const id = Math.random()
    .toString(36)
    .substr(2);
  req.id = id;
  res.id = id;
  /* Querystring  */
  const [path, querystring] = req.url.split("?");
  req.path = path;
  req.query = qs.parse(querystring) || {};
  res.method = req.method;
  res.path = req.path;
  req
    .on("data", chunk => {
      req.body = [];
      req.body.push(chunk);
    })
    .on("end", () => {
      /** We parse our request body as a JSON object */
      req.body = JSON.parse(Buffer.concat(req.body).toString());
      /** We log our request */
      const now = new Date().toISOString(),
        { id, method, path, query } = req;

      if (["GET", "OPTIONS", "HEAD"].includes(req.method)) {
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
      /* Now that our body was parsed, we start our middleware stack */
      router(req, res, finalhandler(req, res));
    });

  /**
   * Response events
   */
  res.on("close", () => {
    logger.error("ERROR EVENT");
  });
  res.on("finish", () => {
    const now = new Date().toISOString();
    const { id, statusCode, statusMessage, body, method, path } = res;
    const log = `${now}: Response ${id} ${method} ${path} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(
      body
    )}`;
    if (statusCode >= 400) {
      logger.error(log);
    } else {
      logger.info(log);
    }
  });
  res.on("error", err => {
    logger.error("Response ERROR EVENT --> err", err);
  });
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
  .use(require("compression")());

/**
 * ROUTES
 */
router.use("/", require("./routes"));

/**
 * Error Handler
 */
router.use(require("./exceptions/handler"));

module.exports = server;
