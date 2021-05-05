import CodeMirror from "../../components/codemirror";
import Map from "../../components/map";

export const Game = () => {
  return(
      <section className="container">
        <div className="row border border-primary">
          <div id="map" className="col">
            <Map />
          </div>
          <div className="col">
            <CodeMirror />
          </div>
        </div>
      </section>
  )
}