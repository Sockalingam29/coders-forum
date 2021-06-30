import React from 'react'
import Answers from './Answers';
import { TextField, Button } from '@material-ui/core';


export default function questions({name,question,time,id}) {
    const [Aname, setAname] = useState("");
    const [answer, setanswer] = useState("");
    const [Adata, setAdata] = useState([]);
    const [ano, setano] = useState(0)
    
    function addAnswer(e){
        e.preventDefault();
        setano(ano+1);
        db.collection(ano).add({
          Aname:Aname,
          time:firebase.firestore.FieldValue.serverTimestamp(),
          ansswer:answer,
        });
        setAname("");
        setAanswer("");
        console.log("Answer added");
        
      }
    
      function dispAnswer(){
        db.collection(ano).orderBy("time", "desc").onSnapshot(function(query){
          setAData(
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
            <div>
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
                {Adata.map((element)=>(
                    <Answers 
                        Aname={element.aname}
                        answer={element.answer}
                        time={element.time}
                        id={element.id}
                    />
                ))}
            </div>
        </div>
    )
}
