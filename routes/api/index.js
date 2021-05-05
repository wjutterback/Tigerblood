const router = require("express").Router();
const commentRoutes = require("./comments.js");

router.use("/comments", commentRoutes);

module.exports = router;
