import React from 'react'
import { TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { db } from './firebase_config';
import firebase from 'firebase';

import './Ques.css';


export default function QuesTion({id,name,question,ianswer}) {
   
    const [answer, setanswer] = useState("");
    const [Adata, setAdata] = useState(ianswer);
    
    useEffect(() => {
      db.collection("4").doc(id).get().then((doc)=>{
        setAdata(doc.data().answer)})
      }, [])

    useEffect(() => {
      db.collection("4").doc(id).get().then((doc)=>{
      setAdata(doc.data().answer)})
      }, [id])

    function addAnswer(e){
        e.preventDefault();
        db.collection("4").doc(id).update({
          answer:answer,
        });
        db.collection("4").doc(id).get().then((doc)=>{
          setAdata(doc.data().answer)}
        )
        setanswer("");
      }


    return (
        <div id="Ques-app">
          
           <div id="questions">
             <div><strong>{question}</strong></div>
             <small>Asked by {name}</small>
             
           </div>
           <div id="ans">
            <strong>Answer</strong>:{Adata}
          </div>
          <form id="answer-form"onSubmit={addAnswer}>

           <TextField 
              label="add/change answer"
              multiline
              required
              onChange={
                (e)=>setanswer(e.target.value)}
              value={answer} /> 
              <button type="submit" >Publish</button>  
          </form>
          <hr/>
        </div>
    )
}
