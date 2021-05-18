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
              <b>"What?"</b> You try to focus. Darkness surrounds you.
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              TigerBlood has you...
            </p>
            <p>
              <b>"What the heck ? ! "</b> You think aloud, confused.
            </p>
            <p>
              Your eyes slowly adjust, as unfamiliar shapes start to form.
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              Follow the red clues...
            </p>
            <p>
              <b>"Follow the red clues ? "</b>, you wonder to yourself.
            </p>
            <p>
              Your thoughts wander towards escaping whatever is going on.
            </p>
            <p>
              The monuments up ahead seem to have writing on them...
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              KNOCK KNOCK...
            </p>
          </div>
          <div className="row" style={{marginTop: "5rem"}}>
            <Link to="/game" className="btn-lg mx-auto btn-danger" id="gameStartButton">WAKE UP</Link>
            <Link to="/" className="btn mx-auto" id="bluePillButton">KEEP SLEEPING</Link>
          </div>
    </section>
  )
}