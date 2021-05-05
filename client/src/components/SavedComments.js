export const SavedComments = (props) => {
  return(
    <li>
      <h3>Commenter: {props.author} - ({props.email})</h3>
      <h4>Comment: {props.text}</h4>
      <p>Left on: {props.date}</p>
    </li>
  )
}