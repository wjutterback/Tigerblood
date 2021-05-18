export const TableHeader = () => {
  return (
    <thead className="thead-dark" style={{color: "red", fontFamily: "Finger Paint", fontSize: "1.5rem"}}>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Player Name</th>
        <th scope="col">High Score</th>
        <th scope="col">Steps Taken</th>
        <th scope="col">Bitcoin Found</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
  )
}