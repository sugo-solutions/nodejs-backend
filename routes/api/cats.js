var Router = require("router"),
  service = require("../../services/cats"),
  ResourceNotFoundException = require("../../exceptions/ResourceNotFound"),
  {
    OkResponse,
    CreatedResponse,
    MethodNotAllowedResponse
  } = require("../../utils/http/responses"),
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
  .post(async (req, res, next) => {
    try {
      const object = await service.create(req.body);
      CreatedResponse(res, object);
      next();
    } catch (err) {
      next(err, req, res);
    }
  })
  .all(async (req, res, next) => {
    MethodNotAllowedResponse(res);
    next();
  });

router
  .use("/:id", async (req, res, next) => {
    try {
      req.cat = await service.getById(req.params.id);
      if (!req.cat) {
        throw new ResourceNotFoundException(
          `Resource "${req.params.id}" not found`
        );
      }
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
  .patch(async (req, res, next) => {
    try {
      const object = await service.patchById(req.params.id, req.body);
      OkResponse(res, object);
    } catch (err) {
      next(err, req, res);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const object = await service.removeById(req.params.id);
      OkResponse(res, object);
    } catch (err) {
      next(err, req, res);
    }
  })
  .all(async (req, res, next) => {
    MethodNotAllowedResponse(res);
    next();
  });

module.exports = router;
