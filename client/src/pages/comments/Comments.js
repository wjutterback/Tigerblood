import { useState, useEffect } from "react";
import API from "../../utils/API"
import { SavedComments } from "../../components/SavedComments";
import { CommentForm } from "../../components/CommentForm";

export const Comments = () => {
  const [savedComments, setSavedComments] = useState([])
  const [newComment, setNewComment] = useState({})

  function getSavedComments (){
    API.getComments().then((response) => {
      console.log(response)
      setSavedComments(response.data)
    })
  }

  useEffect(() => {
    getSavedComments()
  },[])

  function handleFormSubmit (event){
    event.preventDefault();
    saveComment(event.target);
  }

  function saveComment ({ target }){
    setNewComment({
      email: target.dataset.email,
      author: target.dataset.author,
      text: target.dataset.text,
      date: target.dataset.date,
    })
    API.saveComment(newComment)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  return(
    <>
      <section className="container mx-auto">
        <div>
          <h2>{savedComments.length || "No "} Comments Found.</h2>
          <div>
          {savedComments.length > 0 && savedComments.map((comment)=>(
            <SavedComments 
              key={comment._id}
              author={comment.author}
              email={comment.email}
              text={comment.text}
              date={comment.date}
            />
          ))}
          </div>
        </div>
        <br/>
        <div style={{marginTop: "30px"}}>
          <h2>Your Comments</h2>
          <CommentForm
            save={handleFormSubmit}
          />
        </div>
      </section>
    </>
  )
}