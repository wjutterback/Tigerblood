import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PageContainer } from "./pages/pageContainer/PageContainer";
import { Comments } from "./pages/comments/Comments"
import { PreGame } from "./pages/game/PreGame";
import { Game } from "./pages/game/Game";
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
              <Route path="/comments" element={<Comments />} />
              <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
