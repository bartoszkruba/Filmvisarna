const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
    Movie.find({ Title: "Batman" }).then(movies => {
        res.send({
            movies
        })
    });
};

// controller for adding new movies to the DB
module.exports.postAddMovie = (req, res, next ) => {
    console.log(req.body);
    res.send({
        message: 'Movie added'
    });
}