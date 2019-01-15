const MovieSession = require('./models/movieSession');

module.exports.postMovieSessions = async (req, res, next) => {
    try {
        const movieSessions = await MovieSession.find(req.body.query);
        res.send({
            movieSessions: movieSessions
        })
    } catch (error) {
        res.send({
            movieSessions: [],
            message: "No matching movie sessions"
        })
    }
}