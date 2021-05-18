import API from "../../utils/API";

export const RecordScore = (state) => {

  console.log(state)
  let name;
  let date;
  // const { score, steps, bitcoin } =
  // (props.location && props.location.state) || {};

  /* Start of Score Submission to DB (Not Working on first submit)*/
  // function handleScoreSave(event) {
  //   event.preventDefault();
  //   console.log(event.target);
  //   name = event.target.name.value;
  //   score = event.target.score.value;
  //   bitcoin = event.target.bitcoin.value;
  //   steps = event.target.bitcoin.value;
  //   date = new Date().toLocaleDateString();

  //   saveScore();
  // }

  /* Pulls data from State variables except Name and Date */
  // function saveScore(){
  //   API.saveHighScore({
  //     player: name,
  //     steps: steps,
  //     bitcoins: bitcoin || 0,
  //     score: score,
  //     date: date,
  //   })
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err.response));
  // }
  /* End of Score Submission to DB */

  return(
    <section className="container mx-auto">
      <h1>Congratulations!</h1>
      <h2>You managed to escape the dungeon and gained a diploma on the way!</h2>
      <h3>Your performance has been scored. Submit your name and immortalize your performance in the hall of sh.., i mean fame. </h3>
      <div className="row mx-auto" style={{marginBottom: "20px"}}>
        <h2 className="mx-auto">Record Your Score</h2>
      </div>
      <div className="row mx-auto" style={{marginBottom: "30px"}}>
        {/* <form className="w-100"  onSubmit={handleScoreSave}>
          <div className="form-group">
            <label htmlFor="name">Player Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" required/>
          </div>
          <div className='form-group'>
            <label htmlFor='steps'>Steps Taken</label>
            <input
              type='text'
              className='form-control-plaintext'
              readOnly
              id='steps'
              aria-describedby='stepsHelp'
              value={steps}
              style={{ color: 'white' }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='bitcoin'>BitCoins Collected</label>
            <input
              type='text'
              className='form-control-plaintext'
              readOnly
              id='bitcoin'
              aria-describedby='bitcoinHelp'
              value={bitcoin}
              style={{ color: 'white' }}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='score'>Score</label>
            <input
              type='text'
              className='form-control-plaintext'
              readOnly
              id='score'
              aria-describedby='scoreHelp'
              value={score}
              style={{ color: 'white' }}
            />
          </div>
          <button type='submit' className='btn btn-danger'>
            Save Score
          </button>
        </form> */}
      </div>
    </section>
  )
}