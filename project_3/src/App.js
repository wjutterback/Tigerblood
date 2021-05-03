import './App.css';
import CodeMirror from './components/codemirror';
import Map from './components/map';
function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='row border border-primary'>
          <div id='map' className='col'>
            <Map />
          </div>
          <div className='col'>
            <CodeMirror />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
