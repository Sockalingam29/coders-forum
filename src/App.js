import { Button } from '@material-ui/core';
import './App.css';
import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Ques from './Ques';
import { db } from './firebase_config';
import firebase from 'firebase';


function App() {


  const [name, setname] = useState("");
  const [question, setquestion] = useState("");
  const [data, setData] = useState([]);
  const [qno, setqno] = useState(0);
  
  dispQuestion();

  
  function addQuestion(e){
    e.preventDefault();
    setqno(qno+1);
    db.collection("2").add({
      name:name,
      time:firebase.firestore.FieldValue.serverTimestamp(),
      question:question,
    });
    setname("");
    setquestion("");
    console.log("added");
    
  }

  function dispQuestion(){
    db.collection("2").orderBy("time", "desc").onSnapshot(function(query){
      setData(
        query.docs.map((ques)=>({
          id:ques.id,
          name:ques.data().name,
          question:ques.data().question,
          time:ques.data().time
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
          id="filled-multiline-static"
          label="Ask your question"
          multiline
          rows={4}
          variant="filled"
          onChange={
          (e)=>setquestion(e.target.value)}
          value={question}
        /><br/>

      <TextField 
        label="Name"
        onChange={
          (e)=>setname(e.target.value)}
        value={name} />      
        <br></br>
      
      <Button type="submit" variant="contained" color="primary">Default</Button>
      
    </form >

    
    <div>
      
      {data.map((element)=>(
        <Ques 
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
