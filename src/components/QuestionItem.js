import React from "react";

function QuestionItem({ question, handleDeletedQuestion, handleUpdatedQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  //console.log(question)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => handleDeletedQuestion(question))
  }

  function handleChange(event){

    console.log(event.target.value)

        fetch(`http://localhost:4000/questions/${id}`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correctIndex: event.target.value,
          })
        })
        .then(resp => resp.json())
        .then(json => handleUpdatedQuestion(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
