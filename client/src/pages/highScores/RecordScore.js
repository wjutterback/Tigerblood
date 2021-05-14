import { useState, useEffect } from "react";
import API from "../../utils/API"
import { HighScoreForm } from "../../components/HighScoreForm"

export const RecordScore = () => {
  const [newHighScore, setNewHighScore] = useState()
  const [date, setDate] = useState();
  const currentDate = new Date().toLocaleString();

  setDate(currentDate);

  function handleFormSubmit (event){
    event.preventDefault();
    saveHighScore(event.target);
  }

  function saveHighScore ({ target }){
    setNewHighScore({
      player: target.dataset.player,
      score: target.dataset.score,
      steps: target.dataset.steps,
      bitcoin: target.dataset.bitcoin,
      date: target.dataset.date,
    })
    API.saveHighScore(newHighScore)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  return(
    <section className="container mx-auto">
      <div className="row mx-auto" style={{marginBottom: "20px"}}>
        <h2 className="mx-auto">Record Your Score</h2>
      </div>
      <div className="row mx-auto" style={{marginBottom: "30px"}}>
        <HighScoreForm 
          // score={}
          // steps={}
          // bitcoin={}
          date= {date}
          save={handleFormSubmit}
        />
      </div>
    </section>
  )
}