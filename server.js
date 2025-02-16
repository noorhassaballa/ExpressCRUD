import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
// the below set up bodyParser to handle data from React or Postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// process.env.NAME gets the value of NAME from your .env file
const port = process.env.PORT;
app.use(cors({ origin: 'http://localhost:5173' }));

const db = mysql.createConnection({
    host: 'thresholds-test.mysql.database.azure.com',
    user: process.env.USERNAME, // Replace with your MySQL username
    port: process.env.PORT, // Replace with the port you need - may be different from mine
    password: process.env.PASSWORD, // Replace with your MySQL password
    database: 'tasks', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// app.get, .post, .push - these are all set to handle different
// HTTP verbs/methods - we should talk about these
// I like to call these "routes"
app.get('/', (req, res) => {
    res.send('Welcome to the jungle');
})

app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM tasks;";

    db.query(query, (err, results) => {
        if (err) {
            console.log("Error getting tasks");
            console.log(err);
            res.status(500).json({error: 'Error getting tasks.'})
        }
        else {
            res.json(results);
        }
    })
})

// new route to add a task to the database
// app.post('/tasks', (req, res) => {

//     const params = [req.body['title'], req.body['description'], req.body['is_completed']];
//     console.log(req.body)
//     const query = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?);"

//     db.query(query, params, (err, results) => {
//         if (err) {
//             console.log("Error adding task to database");
//             console.log(err);
//             res.status(500).json({error: 'Error adding task to database.'})
//         }
//         else {
//             res.status(200).json(results);
//         }
//     })
// })

// starts the app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})