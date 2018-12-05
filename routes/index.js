var Router = require("router");
var router = new Router();

router.use("/api", require("./api"));

module.exports = router;
