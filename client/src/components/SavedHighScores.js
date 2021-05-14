export const SavedHighScores = (props) => {
  return(

      <div className="card" style={{backgroundColor: "Orange"}}>
        <div className="card-header">
          <h3>{props.player} </h3>
        </div>
        <div className="card-body">
          <h4 className="card-text">Score: {props.score}</h4>
          <h4 className="card-text">Steps Taken: {props.steps}</h4>
          <h4 className="card-text">BitCoins Collected: {props.bitcoin}</h4>
        </div>
        <div className="card-footer">
          <p>submitted on: {props.date}</p>
        </div>
      </div>
  )
}