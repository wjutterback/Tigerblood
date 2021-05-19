import { GameHeader } from '../components/GameHeader';

export const NotFound = () => {
  return (
    <div className="container">
      <GameHeader />
      <div className="row" style={{marginBottom: "100px"}}>
        <h1 className="display-4" style={{margin: "2lh auto 2lh auto", fontFamily: "monospace", color: "red"}}>You must be lost, neophyte. There is nothing to see here on HWY 404.</h1>
      </div>
      <div className="row" style={{marginBottom: "100px"}}>
        <h1 className="display-4" style={{margin: "2lh auto 2lh auto", fontFamily: "monospace", color: "red"}}>Tigerblood will send you home.</h1>
      </div>
    </div>
  )
}