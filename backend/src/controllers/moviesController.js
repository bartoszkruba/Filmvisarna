const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
    Movie.find().then(movies => {
        res.send({
            movies
        })
    });
};