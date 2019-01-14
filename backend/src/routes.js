const express = require('express');

const Router = express.Router();

const moviesController = require('./controllers/moviesController');
const moviesPolicy = require('./policies/moviesPolicy');

Router.post('/addMovie',moviesPolicy.postAddMoviePolicy, moviesController.postAddMovie);

Router.get('/', (req, res, next) => {
    res.send({
        message: 'Hello'
    })
});

Router.get('/movies', moviesController.getMovies);

module.exports = Router;

