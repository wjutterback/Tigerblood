import { Link } from "react-router-dom";
import { GameHeader } from "../../components/GameHeader";
import "./PreGame.css";

export const PreGame = () => {
  return(
    <section className="container">
          <GameHeader />
          <div className="introText">
            <p style={{color: "red", fontFamily: "monospace"}}>
              Wake up, fellow student...
            </p>
            <p>
              You wake up with a jolt, breathing heavily.
            </p>
            <p>
              "What?" You try to focus. Darkness surrounds you.
            </p>
            <p style={{color: "red", fontFamily: "monospace"}}>
              TigerBlood has you...
            </p>
            <p>
              "What the heck?!" You look around confused.
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
              You muster up the courage to start moving around.
            </p>
            <p>
              The stone up front might have some clues...
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