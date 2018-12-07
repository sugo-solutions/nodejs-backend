var Router = require("router"),
  service = require("../../services/cats"),
  ResourceNotFoundException = require("../../exceptions/ResourceNotFound"),
  {
    OkResponse,
    CreatedResponse,
  } = require("../../utils/http/responses"),
  validationSchemas = require("../../validators/cats"),
  { checkSchema } = require("express-validator/check"),
  { matchedData } = require("express-validator/filter"),
  handleValidationErrors = require("../../middleware/handleValidationErrors"),
  router = new Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const objects = await service.list();
      OkResponse(res, objects);
      next();
    } catch (err) {
      next(err, req, res);
    }
  })
  .post(
    checkSchema(validationSchemas.create),
    handleValidationErrors,
    async (req, res, next) => {
      try {
        const object = await service.create(
          matchedData(req, { locations: ["body"] })
        );
        CreatedResponse(res, object);
        next();
      } catch (err) {
        next(err, req, res);
      }
    }
  )

router
  .use("/:id", checkSchema(validationSchemas.detail), handleValidationErrors)
  .param("id", async (req, res, next, id) => {
    try {
      req.cat = await service.getById(id);
      if (!req.cat) {
        throw new ResourceNotFoundException(
          `Resource "${req.params.id}" not found`
        );
      }
      next();
    } catch (err) {
      next(err, req, res);
    }
  })
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      OkResponse(res, req.cat);
    } catch (err) {
      next(err, req, res);
    }
  })
  .patch(
    checkSchema(validationSchemas.update),
    handleValidationErrors,
    async (req, res, next) => {
      try {
        const object = await service.patchById(
          req.params.id,
          matchedData(req, { locations: ["body"] })
        );
        OkResponse(res, object);
      } catch (err) {
        next(err, req, res);
      }
    }
  )
  .delete(async (req, res, next) => {
    try {
      const object = await service.removeById(req.params.id);
      OkResponse(res, object);
    } catch (err) {
      next(err, req, res);
    }
  })

module.exports = router;
