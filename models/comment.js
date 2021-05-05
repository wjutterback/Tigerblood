const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
