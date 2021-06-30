import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { db } from './firebase_config';
import firebase from 'firebase';


export default function Ques(id,name,question,time) {
    const [Aname, setAname] = useState("");
    const [answer, setanswer] = useState("");
    const [Adata, setAdata] = useState([]);
    const [ano, setano] = useState(0);
    
    function addAnswer(e){
        e.preventDefault();
        setano(ano+1);
        db.collection(2).add({
          Aname:Aname,
          time:firebase.firestore.FieldValue.serverTimestamp(),
          answer:answer,
        });
        setAname("")
        setanswer("");
        console.log("Answer added");
        
      }
    
      function dispAnswer(){
        db.collection(2).orderBy("time", "desc").onSnapshot(function(query){
          setAdata(
            query.docs.map((element)=>({
              id:element.id,
              Aname:element.data().name,
              answer:element.data().answer,
              time:element.data().time,
            }
          ))
          );
          }
          );
      }


    return (
        <div>
            <div style={{color:"black"}}>
                <h1>answers</h1>
                <p>{question}</p>
                <small>Asked by {name}</small>
                <small>{time}</small>
            </div>
            <form onSubmit={addAnswer}>
                <TextField 
                    label="Name">
                    onChange={
                    (e)=>setAname(e.target.value)}
                    value={Aname}
                </TextField>
                <br></br>
                <TextField
                    id="filled-multiline-static"
                    label="Enter your answer"
                    multiline
                    rows={2}
                    variant="filled"
                    onChange={
                    (e)=>setanswer(e.target.value)}
                    value={answer}
                    /><br/>
                <Button type="submit" variant="contained" color="secondary">Default</Button>
            </form>

            <div>
                
            </div>
        </div>
    )
}
