import axios from "axios";

const API = {
  // Gets all HighScores
  getHighScores: function() {
    return axios.get("/api/highscores");
  },
  // Gets the HighScore with the given id
  getHighScore: function(id) {
    return axios.get("/api/highscores/" + id);
  },
  // Deletes the HighScore with the given id
  deleteHighScore: function(id) {
    return axios.delete("/api/highscores/" + id);
  },
  // Saves a HighScore to the database
  saveHighScore: function(HighScoreData) {
    return axios.post("/api/highscores", HighScoreData);
  }
};

export default API;

