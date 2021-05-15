const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  player: { type: String, required: true },
  steps: { type: Number },
  bitcoins: {type: Number },
  score: {type: Number },
  date: { type: Date, default: new Date() }
});

const HighScore = mongoose.model("HighScore", highScoreSchema);

module.exports = HighScore;
