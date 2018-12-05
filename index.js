const server = require("./server"),
  logger = require("./utils/logger"),
  mongodb = require("./utils/mongodb");

mongodb.connect().then(
  () => {
    server.listen(8080);
  },
  err => {
    logger.error(
      `There has been an error while connecting to the database --> ${err.toString()}`
    );
  }
);
