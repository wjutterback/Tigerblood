export const CommentForm = (props) => {
  return(
      <form className="w-100">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" className="form-control" id="name" placeholder="Full Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="text">Comment</label>
          <textarea className="form-control" id="text" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={props.save}>Submit</button>
      </form>
  )
}