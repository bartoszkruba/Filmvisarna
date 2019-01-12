const express = require('express');

const Router = express.Router();

const moviesController = require('./controllers/moviesController');

Router.post('/addMovie', moviesController.postAddMovie);

Router.get('/', (req, res, next) => {
    res.send({
        message: 'Hello'
    })
});

Router.get('/movies', moviesController.getMovies);

module.exports = Router;

