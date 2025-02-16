import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
// set up bodyParser to handle data from React or Postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// set port for cors
const port = process.env.PORT;
app.use(cors({ origin: 'http://localhost:5173' }));

// connect to mysql database
const db = mysql.createConnection({
    host: 'thresholds-test.mysql.database.azure.com',
    user: process.env.SQL_USER,
    port: 3306, 
    password: process.env.PASSWORD,
    database: 'nhassaballa_tasks',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

//routes
app.get('/', (req, res) => {
    res.send('Welcome to the jungle');
})

app.get('/tasks', (req, res) => {
    const query = 'select * from nhassaballa_tasks.tasks'

    db.query(query, (err, results) => {
        if (err) {
            console.log("uh oh, spaghettio's")
            console.log(err);
            res.status(500).json({error: 'Error getting tasks.'})
        } else {
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