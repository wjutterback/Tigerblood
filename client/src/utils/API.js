import axios from "axios";

const API = {
  // Gets all HighScores
  getHighScores: function() {
    return axios.get("/api/HighScores");
  },
  // Gets the HighScore with the given id
  getHighScore: function(id) {
    return axios.get("/api/HighScores/" + id);
  },
  // Deletes the HighScore with the given id
  deleteHighScore: function(id) {
    return axios.delete("/api/HighScores/" + id);
  },
  // Saves a HighScore to the database
  saveHighScore: function(HighScoreData) {
    return axios.post("/api/HighScores", HighScoreData);
  }
};

export default API;

