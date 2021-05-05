import axios from "axios";

const API = {
  // Gets all Comments
  getComments: function() {
    return axios.get("/api/comments");
  },
  // Gets the Comment with the given id
  getComment: function(id) {
    return axios.get("/api/comments/" + id);
  },
  // Deletes the Comment with the given id
  deleteComment: function(id) {
    return axios.delete("/api/comments/" + id);
  },
  // Saves a Comment to the database
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  }
};

export default API;

