import { useState, useEffect } from "react";
import API from "../../utils/API";
import { GameHeader } from "../../components/GameHeader";
import { SavedHighScores } from "../../components/SavedHighScores";

export const HighScores = () => {
  const [savedHighScores, setSavedHighScores] = useState([])

  function getSavedHighScores (){
    API.getHighScores().then((response) => {
      console.log(response)
      setSavedHighScores(response.data)
    })
  }

  useEffect(() => {
    getSavedHighScores()
  },[])

  return(
    <>
      <section className="container mx-auto">
        <GameHeader />
        <div className="row mx-auto" style={{marginBottom: "20px"}}>
          <h2 className="mx-auto">HighScores</h2>
        </div>
        <div className="row" style={{marginBottom: "20px"}}>
          <h2 className="mx-auto">{savedHighScores.length || "No "} HighScores Found.</h2>
        </div>
        <div className="row">
        {savedHighScores.length > 0 && savedHighScores.map((HighScore)=>(
          <SavedHighScores 
            key={HighScore._id}
            player={HighScore.player}
            score={HighScore.score}
            steps={HighScore.steps}
            bitcoin={HighScore.bitcoin}
            date={HighScore.date}
          />
        ))}
        </div>
      </section>
    </>
  )
}