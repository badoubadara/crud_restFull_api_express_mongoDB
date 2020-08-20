const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { database } = require('./config/db');

const app = express();

const db = require('./config/db').database;

// Database connection

mongoose.connect(db, {
    useNewUrlParser: true
})
.then(() => {
    console.log('database Connected Successfully')
})
.catch((err) => {
    console.log('Unable to connect with the database', err)
});

// Defining the PORT
const port = process.env.PORT || 5000;

// Initialize cors Middleware
app.use(cors());

// Initialize BodyParser Middleware
app.use(bodyParser.json());

// Initialize Public Directory
/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
*/

app.get('/', (req, res) => {
    res.send('<h2>Hello world</h2>')
});

const postRoutes = require('./routes/apis/post');
app.use('/api/posts', postRoutes);

app.listen(port, () => {
    console.log('server Started on Port ', port)
});