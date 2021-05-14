export const HighScoreForm = (props) => {
  return(
      <form className="w-100">
        <div className="form-group">
          <label htmlFor="name">Player Name</label>
          <input type="text" className="form-control" id="name" placeholder="Full Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="steps">Steps Taken</label>
          <input type="number" className="form-control" id="steps" aria-describedby="stepsHelp" placeholder="Enter steps"/>
        </div>
        <div className="form-group">
          <label htmlFor="bitcoin">BitCoins Collected</label>
          <input type="number" className="form-control" id="bitcoin" aria-describedby="bitcoinHelp" placeholder="BitCoins Found"/>
        </div>
        <div className="form-group">
          <label htmlFor="score">Score</label>
          <input type="number" className="form-control" id="score" aria-describedby="scoreHelp" placeholder="Score"/>
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={props.save}>Submit</button>
      </form>
  )
}