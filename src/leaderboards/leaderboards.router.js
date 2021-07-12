const router = require("express").Router();
const controller = require("./leaderboards.controller");

router.route("/").get(controller.list);

module.exports = router;