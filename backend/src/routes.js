const express = require('express');

// Creating a new router with express for storing routes 
const Router = express.Router();

// Importing moviesController
const moviesController = require('./controllers/moviesController');
const moviesPolicy = require('./policies/moviesPolicy');

const movieTheatreController = require('./controllers/movieTheatreController');

const movieSessionController = require('./controllers/movieSessionController');

Router.post('/addMovie',moviesPolicy.postAddMoviePolicy, moviesController.postAddMovie);

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

// Exporting Router
module.exports = Router;

