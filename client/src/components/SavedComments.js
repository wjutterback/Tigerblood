export const SavedComments = (props) => {
  return(
    <li>
      <div className="card" style={{backgroundColor: "lightblue"}}>
        <div className="card-title">
          <p>{props.author} ({props.email}) says: </p>
        </div>
        <div className="card-body">
          <p className="card-text">Comment: {props.text}</p>
        </div>
        <div className="card-footer">
          <p>Left on: {props.date}</p>
        </div>
      </div>
    </li>
  )
}