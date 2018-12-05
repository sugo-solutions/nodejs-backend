const mongodb = require("../utils/mongodb"),
  { collections } = require("../config/mongodb"),
  { AuditedCrudService } = require("generic-mongodb-services");

module.exports = new AuditedCrudService(
  mongodb.client,
  mongodb.databaseName,
  collections.cats
);
