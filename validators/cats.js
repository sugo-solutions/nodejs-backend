module.exports = {
  create: {
    name: {
      in: ["body"],
      isAlphanumeric: true
    }
  },
  detail: {
    id: {
      in: ["params"],
      isMongoId: true
    }
  },
  update: {
    name: {
      in: ["body"],
      isString: {
        errorMessage: "The name parameter must be a string"
      },
      optional: true
    }
  }
};
