const MovieSession = require('../models/movieSession');
const MovieTheatre = require('../models/movieTheatre');
const User = require('../models/user');
const Bcrypt = require('bcrypt');

module.exports.postMovieSessions = async (req, res, next) => {
    try {
        let movieSessions = await MovieSession.find(req.body.query);
        movieSessions.sort((a, b) => {
            const firstSessionDate = a.date.year.toString()
                + a.date.month.toString().padStart(2, '0')
                + a.date.day.toString().padStart(2, '0')
                + a.date.time.replace(':', '');
            const secondSessionDate = b.date.year.toString()
                + b.date.month.toString().padStart(2, '0')
                + b.date.day.toString().padStart(2, '0')
                + b.date.time.replace(':', '');
            return firstSessionDate > secondSessionDate ? 1 : -1;
        });

        movieSessions = movieSessions.filter(cur => {
            const dateString = cur.date.year.toString()
                + cur.date.month.toString().padStart(2, '0')
                + cur.date.day.toString().padStart(2, '0')
                + cur.date.time.replace(':', '');

            return dateString > getDateString();
        })

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
    const movieTheatre = await MovieTheatre.find({ _id: req.body.movieSession.movieTheatreID });
    new MovieSession({
        movieID: req.body.movieSession.movieID,
        date: req.body.movieSession.date,
        freePlaces: movieTheatre[0].seats,
        movieTheatreID: req.body.movieSession.movieTheatreID
    }).save();
    res.send();
}

module.exports.authenticadeAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.user.email});
        if (user && Bcrypt.compareSync(req.body.user.password, user.password) && user.admin) {
            next();
        }else{
            res.status(400).send({
                error: 'You are not authorized'
            });
        }
    } catch (error) {
        res.status(400).send({
            error: 'Could not add session to the database'
        });
    }
}


function getDateString() {
    let date = new Date();

    let string = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}${date.getHours().toString().padStart(2, 0)}${date.getMinutes().toString().padStart(2, 0)}`
    return string
}