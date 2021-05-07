import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames"

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav className="navbar navbar-expand-lg navbar-light" style={{ marginBottom: "50px "}}>
    <Link className="navbar-brand" to="/">
      <h1>Project_Tigerblood</h1>
    </Link>
    <div className={
        cn(["collapse", "navbar-collapse"],{
          show: isOpen
        })
        }
        id="navToggler"> 
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/game" className="nav-link h2" id="gamesNavBtn" onClick={()=> setIsOpen(false)}>Game</Link>
        </li>
        <li className="nav-item">
          <Link to="/comments" className="nav-link h2" id="commentsNavBtn" onClick={()=> setIsOpen(false)}>Comments</Link>
        </li>
      </ul>
    </div>
    <button 
      className="navbar-toggler" 
      type="button" 
      data-toggle="collapse" 
      data-target="#navToggler" 
      aria-controls="navToggler" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
      style={{marginLeft: "auto"}}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  </nav>
  )
}