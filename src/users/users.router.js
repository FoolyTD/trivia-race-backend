const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./users.controller");

router.route("/:userId").get(controller.read);
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;