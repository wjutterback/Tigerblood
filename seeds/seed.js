const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tigerblood_db"
);

const commentSeed = [
  {
    email: "csheen@email.com",
    author: "Charlie Sheen",
    text: "Wow! What a game! You guys are WINNING!",
    date: new Date(Date.now())
  },
  {
    email: "wsnipes@email.com",
    author: "Wesley Snipes",
    text: "Great job guys! You made it! If you ever need financial advice, hit me up!",
    date: new Date(Date.now())
  },
  {
    email: "tcruise@email.com",
    author: "Tom Cruise",
    text: "Impressive! You can make it even better by adding volcanoes and spaceships. Maybe the sequel?",
    date: new Date(Date.now())
  }
];

db.Comment
  .remove({})
  .then(() => db.Comment.collection.insertMany(commentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
