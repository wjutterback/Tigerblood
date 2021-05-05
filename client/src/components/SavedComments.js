export const SavedComments = (props) => {
  return(
    <div className="col-sm-12">
      <div className="card" style={{backgroundColor: "lightblue", marginBottom:"30px"}}>
        <div className="card-header">
          <h3>{props.author} ({props.email}) says: </h3>
        </div>
        <div className="card-body">
          <h4 className="card-text">{props.text}</h4>
        </div>
        <div className="card-footer">
          <p>submitted on: {props.date}</p>
        </div>
      </div>
    </div>
  )
}