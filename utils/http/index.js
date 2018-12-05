/**
 *
 * @param {http.ServerResponse} res
 * @param {Object} data
 */
const sendJsonResponse = (res, data) => {
  res.end(JSON.stringify(data));
};

module.exports = {
  sendJsonResponse
};
