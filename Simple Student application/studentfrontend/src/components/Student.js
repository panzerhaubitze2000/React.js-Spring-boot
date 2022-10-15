import React, { useState } from 'react';

export default function Student() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    function sendData(event) {
        event.preventDefault();

        const student = {name, address}

        fetch("http://localhost:8081/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() => {
            console.log("Sended");
        })
    }

    function getData(event) {
        event.preventDefault();

        let answer = []

        fetch("http://localhost:8081/student/getAll").then(response => response.json()).then(response => {
            for (let item in response) {

                let element = {
                    id: response[item].id,
                    name: response[item].name,
                    address: response[item].address
                }

                JSON.stringify(element);
                
                answer.push(element);
            }
        });

        console.log(answer);
    }

    return (
        <>
            <input placeholder="Student name" value={name} onChange={(event) => {
                setName(event.target.value)
            }}/>
            <input placeholder="Student address" value={address} onChange={event => {
                setAddress(event.target.value)
            }}/>
            <button onClick={sendData}>Send</button>
            <button onClick={getData}>Get</button>
        </>
    );
}