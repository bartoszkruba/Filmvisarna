// importing mongoose model for Movie
const Movie = require('../models/movie');
const Bcrypt = require('bcrypt');

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
    try {
        const user = await User.findOne({ email: req.body.user.email});
        if (user && Bcrypt.compareSync(req.body.user.password, user.password) && user.admin) {
            await new Movie(req.body.movie).save();
            res.send({
                message: 'Movie added'
            });
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
