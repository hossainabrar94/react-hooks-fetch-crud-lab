import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({setQuestions, questions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(json => setQuestions(json))
  }, [])

  function handleDeletedQuestion(deletedQuestion){
    setQuestions(questions.filter((question) => question!== deletedQuestion))
  }

  function handleUpdatedQuestion(updatedQuestion){

    //console.log(updatedQuestion.id)
    
    const updatedQuestions = questions.map((question) => {
      if(question.id === updatedQuestion.id){
        return updatedQuestion
      }else{
        return question
      }
    })
    setQuestions(updatedQuestions)
    console.log(questions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <QuestionItem key = {index} question={question} handleDeletedQuestion = {handleDeletedQuestion} handleUpdatedQuestion={handleUpdatedQuestion}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
