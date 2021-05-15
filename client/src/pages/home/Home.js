import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {

  return(
    <section className="container" id="homeContainer">
      <div className="jumbotron jumbotron-fluid" id="homeJumbotron">
        <div className="container">
          <img src="/preview/tigerbloodlogo.png" alt="logo" id="homeLogo"/>
          <div>
            <h1 id="homeGreeting">A coding induced nightmare ...</h1>
          </div>
          <div>
            <Link to="/pregame" className="start-btn btn-lg">START</Link>
            <Link to="/highscores" className="start-btn btn-lg">HIGH SCORES</Link>
          </div>
          <div>
            <h1 id="homeSubText">The brainchild of Will the Wizard and Fahad the (very) Impressed</h1>
          </div>
        </div>
      </div>
    </section>
  )
}