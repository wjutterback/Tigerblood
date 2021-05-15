import { Link } from "react-router-dom";
import { GameHeader } from "../../components/GameHeader";
import "./PreGame.css";

export const PreGame = () => {
  return(
    <section className="container">
          <GameHeader />
          <div className="introText">
            <p style={{color: "red", fontFamily: "monospace"}}>
              Wake up, neophyte...
            </p>
            <p>
              You open your eyes. There's a voice inside your head.
            </p>
            <p>
              "What?" You try to focus. Darkness surrounds you.
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              TigerBlood has you...
            </p>
            <p>
              "What the heck?!" You think aloud, confused.
            </p>
            <p>
              You eyes slowly adjust, as unfamiliar shapes start to form.
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              Follow the red clues...
            </p>
            <p>
              "Follow the red clues?", you wonder to yourself.
            </p>
            <p>
              Your thoughts wander towards escaping whatever is going on.
            </p>
            <p>
              The monument up ahead seems to have writing on it...
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              KNOCK KNOCK...
            </p>
          </div>
          <div className="row" style={{marginTop: "10rem"}}>
            <Link to="/game" className="btn-lg mx-auto btn-danger" id="gameStartButton">WAKE UP</Link>
            <Link to="/" className="btn mx-auto" id="bluePillButton">KEEP SLEEPING</Link>
          </div>
    </section>
  )
}