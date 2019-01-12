// importing mongoose model for Movie
const Movie = require('../models/movie');

module.exports.getMovies = async (req, res, next) => {
    //Finding all the matching movies
    const movies = await Movie.find(req.body.query);

    //Sending movies back
    res.send({movies});
};