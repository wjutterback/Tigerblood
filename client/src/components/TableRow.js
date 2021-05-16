export const TableRow = ( props ) => {
  return(
      <tr style={{color: "white", fontFamily: "fantasy", fontSize: "1.5rem"}}>
        <th scope="row">{props.i+1}</th>
        <td>{props.name}</td>
        <td>{props.score}</td>
        <td>{props.steps}</td>
        <td>{props.bitcoin || 0}</td>
        <td>{props.date}</td>
      </tr>
  )
}