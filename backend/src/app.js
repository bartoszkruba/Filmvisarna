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

const startupConfig = require('./util/startupConfig');

const uniqid = require('uniqid');

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
    app.listen(startupConfig.port, () => {

        // resetEverything();

        // new MovieSession({
        //     movieID: '5c3897dba4b4065c06286187',
        //     date: {
        //         year: 2019,
        //         month: 2,
        //         day: 12,
        //         time: "20:00"
        //     },
        //     freePlaces: 81,
        //     movieTheatreID: "5c3dae361a418e28df53e67a"
        // }).save();
        console.log(startupConfig.startupMessage);
    });
}

// Starting server
startServer();

async function resetEverything() {
    const MovieSession = require('./models/movieSession');
    const MovieTheatre = require('./models/movieTheatre');
    const User = require('./models/user');

    const movieSessions = await MovieSession.find();

    for(let k = 0; k < movieSessions.length; k++){

        const theatreID = movieSessions[k].movieTheatreID;
        const movieTheatre = await MovieTheatre.findOne({_id: theatreID});
        let freePlaces = [];
    
        for(let i = 0; i < movieTheatre.seatsPerRow.length; i++){
            for(let j = 0; j < movieTheatre.seatsPerRow[i]; j++){
                const seat = getLetter(i) + (j+1) + "";
                freePlaces.push({seatNumber: seat, booked: false});
            }
        }
        movieSessions[k].places = freePlaces;
        movieSessions[k].freePlaces = movieTheatre.seats;
        movieSessions[k].FreePlaces = null;
        movieSessions[k].Places = null;
        movieSessions[k].save();
    }

    const users = await User.find();

    for(let f = 0; f < users.length; f++){
        users[f].bookedTickets = [];
        users[f].save();
    }
}

function getLetter(row){
    switch (row+1) {
        case 1:
            return "A"
        case 2:
            return "B"
        case 3:
            return "C"
        case 4:
            return "D"
        case 5:
            return "E"
        case 6:
            return "F"
        case 7:
            return "G"
        case 8:
            return "H"
        case 9:
            return "I"
        case 10:
            return "I"
        default:
        return "X"
    }
};

//*************************************************************** */
// !!!!! Calling this will fuck upp all passwords in Database !!!!
async function hashPasswords(){
    
    const User = require('./models/user');
    const Bcrypt = require('bcrypt');

    const users = await User.find();
    for(let i = 1; i < users.length; i++){
        users[i].password = Bcrypt.hashSync(users[i].password, 10);
        users[i].save();
    }
}
// *******************************************************************
