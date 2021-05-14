const router = require("express").Router();
const highScoresRoutes = require("./highScores.js");

router.use("/highscores", highScoresRoutes);

module.exports = router;
