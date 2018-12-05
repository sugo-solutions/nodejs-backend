const MongoDbConnection = require("mongodb-connection-simple"),
  { uri, database, options } = require("../config/mongodb");

module.exports = new MongoDbConnection(uri, database, options);
