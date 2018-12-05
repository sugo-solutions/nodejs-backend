const codes = require("./codes");

/**
 * Implements an Ok response.
 *
 * @param {http.ServerResponse} res: NodeJS response object
 * @param {object} data: JSON data to be stringfied and sent
 */
const OkResponse = (res, data) => {
  res.statusCode = codes.OK;
  res.end(JSON.stringify(data));
};

/**
 * Implements an Created response.
 *
 * @param {http.ServerResponse} res: NodeJS response object
 * @param {object} data: JSON data to be stringfied and sent
 */
const CreatedResponse = (res, data) => {
  res.statusCode = codes.CREATED;
  res.end(JSON.stringify(data));
};

/**
 * Implements a Method Not Allowed Response
 *
 * @param {http.ServerResponse} res: NodeJS response object
 */
const MethodNotAllowedResponse = res => {
  res.statusCode = codes.METHOD_NOT_ALLOWED;
  res.end();
};

module.exports = {
  OkResponse,
  CreatedResponse,
  MethodNotAllowedResponse
};
