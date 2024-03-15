const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

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




// Function to save user details in the database
function saveDetails(name, password, callback) {
    const query = 'INSERT INTO details (name, password) VALUES (?, ?)';
    const values = [name, password];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting details:', error);
            callback(error);
            return;
        }
        console.log('Details saved successfully');
        callback(null, results);
    });
}




// Endpoint to handle POST request to save user details
app.post('/save-details', (req, res) => {
    const { name, password } = req.body;

    saveDetails(name, password, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Failed to save details' });
            return;
        }
        res.status(200).json({ message: 'Details saved successfully' });
    });
});

app.listen(3000,() => {
    console.log('Server configuration Succesfull...')
});



