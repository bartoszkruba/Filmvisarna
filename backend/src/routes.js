const express = require('express');

// Creating a new router with express for storing routes 
const Router = express.Router();

// Importing moviesController
const moviesController = require('./controllers/moviesController');
const moviesPolicy = require('./policies/moviesPolicy');

const movieTheatreController = require('./controllers/movieTheatreController');

const movieSessionController = require('./controllers/movieSessionController');

const authenticationController = require('./controllers/authenticationController');
const authenticationPolicy = require('./policies/authenticationPolicy');

const bookingController = require('./controllers/bookingController');

Router.post('/addMovie',moviesPolicy.postAddMoviePolicy, moviesController.postAddMovie);

Router.post('/addMovie', moviesPolicy.postAddMoviePolicy, moviesController.postAddMovie);

Router.post('/searchMovies', moviesController.searchMovies);
// Creating routes for different URLs

// route for GET request to  localhost:8081/
Router.get('/', (req, res, next) => {
    res.send({
        message: 'Hello'
    })
});

// route for POST request to localhost:8081/movies
Router.post('/movies', moviesController.getMovies);


Router.post('/movieTheatres', movieTheatreController.postMovieTheatres);

Router.post('/movieSessions', movieSessionController.postMovieSessions);

Router.post('/addMovieSession', movieSessionController.postAddMovieSession);

Router.post('/register', authenticationPolicy.postRegister, authenticationController.postRegister);
Router.post('/login', authenticationController.postValidate);
Router.post('/getTickets', authenticationController.getBookedTickets);
Router.post('/setTickets', bookingController.setBookedTicket);

// Exporting Router
module.exports = Router;