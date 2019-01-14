const express = require('express');

const Router = express.Router();

const moviesController = require('./controllers/moviesController');
const moviesPolicy = require('./policies/moviesPolicy');

const authenticationController = require('./controllers/authenticationController');
const authenticationPolicy = require('./policies/authenticationPolicy');


Router.post('/addMovie', moviesPolicy.postAddMoviePolicy, moviesController.postAddMovie);

Router.get('/', (req, res, next) => {
    res.send({
        message: 'Hello'
    })
});

Router.get('/movies', moviesController.getMovies);

Router.post('/register', authenticationPolicy.postRegister, authenticationController.postRegister);

module.exports = Router;