import React from 'react'

export default function Answers({Aname,answer,time,id}) {
    return (
        <div>
            <div>
                <div>{answer}</div>
                <div>
                    {Aname}
                    {time}
                </div>
            </div>
        </div>
    )
}
