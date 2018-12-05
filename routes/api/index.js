var Router = require("router");
var router = new Router();

router.use("/cats", require("./cats"));

module.exports = router;
