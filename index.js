const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();





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

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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



