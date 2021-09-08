const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./users.controller");

router.route("/").post(controller.create).all(methodNotAllowed);
router.route("/all").post(controller.list).all(methodNotAllowed);
router.route("/login").post(controller.login).all(methodNotAllowed);
router
  .route("/:userId")
  .get(controller.read)
  .post(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
