import './App.css';
import CodeMirror from './pages/codemirror';
import Map from './pages/map';
function App() {
  return (
    <div className='App'>
      <container>
        <div className='row border border-primary'>
          <div id='map' class='col'>
            <Map />
          </div>
          <div class='col'>
            <CodeMirror />
          </div>
        </div>
      </container>
    </div>
  );
}

export default App;
