import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {

  return(
    <section className="container" id="homeContainer">
      <div className="jumbotron jumbotron-fluid" id="homeJumbotron">
        <div className="container">
          <img src="/preview/tigerbloodlogo.png" alt="logo" id="homeLogo"/>
          <br />
          <h1 id="homeGreeting">The brainchild of Will the Wizard and Fahad the (very) Impressed</h1>
          <br />
          <Link to="/game" className="start-btn btn-lg">START</Link>
          <Link to="/comments" className="start-btn btn-lg">COMMENTS</Link>
        </div>
      </div>
    </section>
  )
}