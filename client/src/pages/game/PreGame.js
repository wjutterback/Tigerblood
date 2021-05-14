import { Link } from "react-router-dom";
import { GameHeader } from "../../components/GameHeader";
import "./PreGame.css";

export const PreGame = () => {
  return(
    <section className="container">
          <GameHeader />
          <div className="introText">
            <p>
              You wake up with a jolt, breathing heavily.
            </p>
            <p>
              What is this place? Why is it so dark? What's going on?
            </p>
            <p>
              Your eyes start to adjust to the dark.
            </p>
            <p>
              You look around confused, as unfamiliar shapes start to appear.
            </p>
            <p>
              You muster up the courage to start moving around.
            </p>
            <p>
              The stone up front might have some clues...
            </p>
          </div>
          <div className="row">
            <Link to="/game" className="btn-lg mx-auto" id="gameStartButton">START</Link>
          </div>
    </section>
  )
}