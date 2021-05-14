import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PageContainer } from "./pages/pageContainer/PageContainer";
import { HighScores } from "./pages/highScores/HighScore"
import { PreGame } from "./pages/game/PreGame";
import { Game } from "./pages/game/Game";
import { RecordScore } from "./pages/highScores/RecordScore"
import { Home } from "./pages/home/Home";
import { NotFound } from "./pages/NotFound";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<PageContainer />}>
              <Route path="/" element={<Home />} />
              <Route path="/pregame" element={<PreGame />}/>
              <Route path="/game" element={<Game />} />
              <Route path="/recordscore" element={<RecordScore />}/>
              <Route path="/highscores" element={<HighScores />} />
              <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
