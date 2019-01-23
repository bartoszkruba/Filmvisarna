// importing mongoose model for Movie
const Movie = require('../models/movie');
const Bcrypt = require('bcrypt');
const User = require('../models/user');

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
        const user = await User.findOne({ email: req.body.user.email});
        if (user && Bcrypt.compareSync(req.body.user.password, user.password) && user.admin) {
            next();
        }else{
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
