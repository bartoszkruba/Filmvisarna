const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
    Movie.find({ Title: "Batman" }).then(movies => {
        res.send({
            movies
        })
    });
};