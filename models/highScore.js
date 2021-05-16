const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  player: { type: String, required: true },
  steps: { type: Number },
  bitcoins: {type: Number },
  score: {type: Number },
  date: { type: String } // Keeping the type as Date kept changing the format back to UTC
});

const HighScore = mongoose.model("HighScore", highScoreSchema);

module.exports = HighScore;
