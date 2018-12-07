const { validationResult } = require("express-validator/check"),
  ValidationFailedException = require("../exceptions/ValidationFailed");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ValidationFailedException(
      "Body validation failed",
      errors.array()
    );
    next(error, req, res);
  }
  next();
};

module.exports = handleValidationErrors;
