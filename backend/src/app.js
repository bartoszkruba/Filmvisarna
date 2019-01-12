// Used as http server - creates routes for different URLs
const express = require('express');
// Used for connecting to MongoDB and creating new collections 
const mongoose = require('mongoose');
// Used for parsing the incoming data into a format which is easy to work with 
const bodyParser = require('body-parser');
// Logs to the console which computer is trying to connect to the sever
const morgan = require('morgan');
// Enables the CORS connection with the server - by the default all internet browsers blocks CORS 
const cors = require('cors');

// Storing routes for different URLs
const Router = require('./routes');

// Using express to create a server and storing it into a variable
const app = express();

// Telling Server to use cors package
app.use(cors());
// Telling server to use body-parser package with json configuration
app.use(bodyParser.json());
// Telling server to use morgan
app.use(morgan('combined'));
// Telling server to use routes
app.use(Router);

// function for starting server
const startServer = async () => {
    // Telling mongoose to connect to the MongoDB Atlas
    await mongoose.connect('mongodb+srv://groupaccount:groupaccount1234@cluster0-ydy7f.mongodb.net/filmvisarna', {useNewUrlParser: true});
    // Telling server to start listening on localhost:8081
    app.listen(8081, () => {
        console.log('Listening on 8081');
    });
}

// Starting server
startServer();