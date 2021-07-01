import { Button } from '@material-ui/core';
import './App.css';
import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import QuesTion from './Ques';
import { db } from './firebase_config';
import firebase from 'firebase';


function App() {


  const [name, setname] = useState("");
  const [question, setquestion] = useState("");
  const [data, setData] = useState([]);
  const [qno, setqno] = useState(0);
  
  useEffect(() => {
  dispQuestion();
}, [name])
  
  
  function addQuestion(e){
    e.preventDefault();
    setqno(qno+1);
    db.collection("4").add({
      name:name,
      time:firebase.firestore.FieldValue.serverTimestamp(),
      question:question,
      answer:"none",
    });
    setname("");
    setquestion("");
    console.log("added");
    
  }
  
  
  
  function dispQuestion(){  
    db.collection("4").orderBy("time", "desc").onSnapshot(function(query){
    setData(
      query.docs.map((element)=>({
        id:element.id,
        name:element.data().name,
        question:element.data().question,
        time:element.data().time,
        answer:"none",
      }
    ))
    );
    }
    );
  }

 return (
    <div className="App">
      <header>
        <h1>tce coders' forum</h1>
        <i class="far fa-file-code"></i>
      </header>
    <form id="question-form" onSubmit={addQuestion}>
    <div id="divs"><TextField className="question-text"
          id="filled-multiline-static"
          label="ask your question"
          multiline
          required
          rows={2}
          variant="filled"
          onChange={
          (e)=>setquestion(e.target.value)}
          value={question}
        /><br/>

      <TextField 
        label="name"
        id="name-text"
        required
        onChange={
          (e)=>setname(e.target.value)}
        value={name} />      
        <br></br>
        </div>
      <Button id="ask-btn" type="submit" variant="contained" color="primary">ask</Button>
      
    </form >
        <hr />
    
    <div >
      <h1 id="feed">Feed</h1>
      {data.map((element)=>(
        <QuesTion 
          name={element.name}
          id={element.id}
          time={element.time}
          question={element.question}
          ianswer={element.answer}
        />
      ))}
    </div>
    <footer>Made by Sockalinam</footer>
    </div>
  );
}

export default App;

