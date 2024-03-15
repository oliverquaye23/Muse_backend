const mysql = require("mysql2");
const express = require("express");
const bodyparser = require("body-parser");


const app = express();

// Connection to the database

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'brainy1234',
    database: 'muse_database'
});

connection.connect((err) =>{
    if(err){
        console.error("Database connection Failure...",err.message);
    return;
     }
    console.log("Database connection succesfull...")

    });

// Add new event

function addNewEvent(){
    const query = 'INSERT INTO  '
}


app.listen(3000,() => {
    console.log('Server configuration Succesfull...')
});


