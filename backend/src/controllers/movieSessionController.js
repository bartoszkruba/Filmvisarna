const MovieSession = require('../models/movieSession');
const MovieTheatre = require('../models/movieTheatre');

module.exports.postMovieSessions = async (req, res, next) => {
    try {
        const movieSessions = await MovieSession.find(req.body.query);
        res.send({
            movie_sessions: movieSessions
        })
    } catch (error) {
        res.send({
            movie_sessions: [],
            message: "No matching movie sessions"
        })
    }
}
module.exports.postAddMovieSession = async (req, res, next) => {
    const movieTheatre = await MovieTheatre.find({_id: req.body.movieSession.movieTheatreID});
    new MovieSession({
        movieID: req.body.movieSession.movieID,
        date: req.body.movieSession.date,
        freePlaces: movieTheatre[0].seats,
        movieTheatreID: req.body.movieSession.movieTheatreID
    }).save();
    res.send();
}