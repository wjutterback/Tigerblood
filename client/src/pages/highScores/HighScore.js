import { useState, useEffect } from "react";
import { GameHeader } from "../../components/GameHeader";
import { TableHeader } from "../../components/TableHeader";
import { TableRow } from "../../components/TableRow";
import API from "../../utils/API";

export const HighScores = () => {
  const [savedHighScores, setSavedHighScores] = useState([]);
  const [sortedHighScores, setSortedHighScores] = useState([]);

  function getSavedHighScores (){
    API.getHighScores().then((response) => {
      setSavedHighScores(response.data)
    })
  }

  useEffect(() => {
    getSavedHighScores();
  },[])

  useEffect(() => {
    setSortedHighScores(savedHighScores.sort((a, b) => b.score - a.score));
  },[savedHighScores])

  return(
    <>
      <section className="container mx-auto">
        <GameHeader />
        <div className="row mx-auto" style={{marginBottom: "20px"}}>
          <h1 className="mx-auto" style={{color: "red", fontFamily: "fantasy"}}>HighScores</h1>
        </div>
        <div className="row" style={{marginBottom: "20px"}}>
          <h1 className="mx-auto" style={{color: "red", fontFamily: "fantasy"}}>{sortedHighScores.length || "No "} HighScores Found.</h1>
        </div>
        <div className="table-responsive" style={{margin: "50px"}}>
          <table className="table table-striped">
            <TableHeader/>
            <tbody>
              {sortedHighScores.length > 0 && sortedHighScores.map((score, i) => (
              <TableRow key={i+256} i={i} name={score.player} score={score.score} steps={score.steps} bitcoin={score.bitcoin} date={score.date}/>
              ))} 
              <tr>
                <td colSpan="5">Total Scores: {sortedHighScores.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}