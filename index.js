const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

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

// get all items in the database

function getItems(){
    query = "SELECT * FROM muse_database.events_table;"
   
    connection.query(query,(error,results) =>{
        if (error) {
            console.log("Error fetching items:" + error.stack);
            return;
        }

        console.log('Items in the database:')
        results.forEach((events_table) =>{
            console.log(`ID: ${events_table.userId}, Title: ${events_table.title}, Venue: ${events_table.venue}`);
        })
    })

}

// Function to save user details in the database
function saveDetails(username,password) {
    const query = 'INSERT INTO users ( username,password) VALUES ( ?,?)';
    const values = [username, password];

    connection.query(query, values, (error) => {
        if (error) {
            console.error('Error inserting details:', error);
            return;
        }
        console.log('Details saved successfully');
    });
}

 
// Function to save event details in the database
function save_event_details(userId, title,venue,datetime,description ) {
    const query = 'INSERT INTO events_table (userId, title, venue,datetime,description) VALUES (?, ?, ?,?,?)';
    const values = [userId, title,venue,datetime,description];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting details:', error);
            return;
        }
        console.log('Details saved successfully');
        

        getItems()
    });
}

//saveDetails(3,"banku fair","my house","2024-5-13","sweet");


// Endpoint to handle POST request to save user details for new registration
app.post('/save-details', (req, res) => {

    console.log("------------------------------")
    console.log(req.body)
    const { username, password } = req.body;
   
    saveDetails(username, password, (error, results) => {
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



