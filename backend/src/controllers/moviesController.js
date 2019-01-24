// importing mongoose model for Movie
const Movie = require('../models/movie');
const Bcrypt = require('bcrypt');
const User = require('../models/user');
const MovieSession = require('../models/movieSession');
const fs = require('fs');
const path = require('path');

module.exports.getMovies = async (req, res, next) => {
    try {
        await Movie.find(req.body.query).then(movies => {
            res.send({
                movies
            })
        });
    } catch (error) {
        res.status(400).send({
            error: 'No movie found'
        })
    }
};

module.exports.deleteMovie = async (req, res, next) => {
    const movie = await Movie.findOne({ _id: req.body.movieID });
    if (!movie) {
        return res.status(400).send({
            error: "Could not find the movie"
        })
    }
    const sessions = await MovieSession.find({ movieID: req.body.movieID });
    let filesToDelete = [];
    filesToDelete.push(movie.imagesLinks.poster.split(`/`)[1]);
    filesToDelete.push(movie.imagesLinks.background.split(`/`)[1]);

    let error;

    try {
        filesToDelete.forEach(async cur => {
            await fs.unlink(path.join(__dirname, '../', '../', 'public', cur), (err) => {
                if (err) console.log(err);
            });
        })
    } catch (e) {
        console.log(e);
        error = "files"
    }

    try {
        sessions.forEach(async cur => {
            await MovieSession.findByIdAndDelete(cur._id);
        });
    } catch (e) {
        console.log(e);
        error = "sessions"
    }

    try {
        await Movie.findByIdAndDelete(movie._id);
    } catch (e) {
        console.log(e);
        error = "movie"
    }

    switch (error) {
        case "files":
            res.status(400).send({
                error: "Something went wrong during deleting pictures"
            })
            break;
        case "sessions":
            res.status(400).send({
                error: "Something went wrong during deleting sessions"
            })
            break;
        case "movie":
            res.status(400).send({
                error: "Something went wrong during deleting movie"
            })
            break;
        default:
            return res.send({
                message:  `"${movie.title}" deleted`
            })
    }
}

// controller for adding new movies to the DB
module.exports.postAddMovie = async (req, res, next) => {
    const movie = {
        imagesLinks: {
            poster: req.files.poster[0].path,
            background: req.files.background[0].path,
        },
        title: req.body.title,
        productionCountries: req.body.productionCountries,
        productionYear: req.body.productionYear,
        length: req.body.length,
        genre: req.body.genre,
        distributor: req.body.distributor,
        language: req.body.language,
        subtitles: req.body.subtitles,
        director: req.body.director,
        ageLimit: req.body.ageLimit,
        actors: req.body.actors,
        description: req.body.description,
        youtubeTrailers: req.body.youtubeTrailers,
        reviews: req.body.reviews
    }
    await new Movie(movie).save();
    res.send({
        message: "Film added to database"
    })
}

module.exports.authenticateAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.user.email });
        if (user && Bcrypt.compareSync(req.body.user.password, user.password) && user.admin) {
            next();
        } else {
            res.status(400).send({
                error: 'You are not authorized'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: 'Could not add movie to the database'
        });
    }
}

module.exports.searchMovies = async (req, res, next) => {
    let query = {};
    if (req.body.query) {
        const nameExp = new RegExp(req.body.query, 'i');
        query = { $or: [{ title: nameExp }, { director: nameExp }, { genre: nameExp }, { "actors": { "$all": [nameExp] } }] };
        const movies = await Movie.find(query);
        res.send({
            movies: movies
        });
    } else {
        res.send();
    }

}
