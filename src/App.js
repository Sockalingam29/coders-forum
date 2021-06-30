import { Button } from '@material-ui/core';
import './App.css';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import questions from './questions';

function App() {

  const [name, setname] = useState("");
  const [question, setquestion] = useState("");
  const [data, setdata] = useState([]);
  

  function addQuestion(e){
    e.preventDefault();
    setqno(qno+1);
    db.collection(1).add({
      name:name,
      time:firebase.firestore.FieldValue.serverTimestamp(),
      question:question,
    });
    setname("");
    setquestion("");
    console.log("added");
    
  }

  function dispQuestion(){
    db.collection(1).orderBy("time", "desc").onSnapshot(function(query){
      setData(
        query.docs.map((element)=>({
          id:element.id,
          name:element.data().name,
          question:element.data().question,
          time:element.data().time,
        }
      ))
      );
      }
      );
  }

  return (
    <div className="App">
    <form onSubmit={addQuestion}>
      <TextField 
        label="Name">
        onChange={
          (e)=>setname(e.target.value)}
        value={name}
      </TextField>
      <br></br>
      <TextField
          id="filled-multiline-static"
          label="Ask your question"
          multiline
          rows={4}
          variant="filled"
          onChange={
          (e)=>setquestion(e.target.value)}
          value={question}
        /><br/>
      <Button type="submit" variant="contained" color="primary">Default</Button>
      
    </form >

    <div>
      {data.map((element)=>(
        <questions 
          name={element.name}
          question={element.question}
          time={element.time}
          id={element.id}
        />
      ))}
    </div>
    </div>
  );
}

export default App;
