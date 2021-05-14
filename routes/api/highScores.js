const router = require("express").Router();
const highScoresController = require("../../controllers/highScoresController.js");

router.route("/")
  .get(highScoresController.findAll)
  .post(highScoresController.create);

router
  .route("/:id")
  .get(highScoresController.findById)
  .put(highScoresController.update)
  .delete(highScoresController.remove);

module.exports = router;
