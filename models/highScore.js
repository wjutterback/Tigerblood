const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  player: { type: String, required: true },
  steps: { type: Number, required: true },
  bitcoins: {type: Number, required: true },
  score: {type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const HighScore = mongoose.model("HighScore", highScoreSchema);

module.exports = HighScore;
