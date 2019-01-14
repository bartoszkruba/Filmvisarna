// importing mongoose model for Movie
const Movie = require('../models/movie');


module.exports.getMovies = (req, res, next) => {
    Movie.find({ Title: "Batman" }).then(movies => {
        res.send({
            movies
        })
    });
};

// controller for adding new movies to the DB
module.exports.postAddMovie = async (req, res, next ) => {
    try{
        await new Movie(req.body.movie).save();
        res.send({
            message: 'Movie added'
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            error: 'Could not add movie to the database'
        })
    }
}

