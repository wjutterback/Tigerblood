const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tigerblood_db"
);

const highScoreSeed = [
  {
    player: "Charlie Sheen",
    score: 9000,
    steps: 2000,
    bitcoin: 3,
    date: new Date(Date.now())
  },
  {
    player: "Wesley Snipes",
    score: 20120,
    steps: 500,
    bitcoin: 10,
    date: new Date(Date.now())
  },
  {
    player: "Ryan Reynolds",
    score: 6969,
    steps: 1000,
    bitcoin: 0,
    date: new Date(Date.now())
  }
];

db.HighScore
  .remove({})
  .then(() => db.HighScore.collection.insertMany(highScoreSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
