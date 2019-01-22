const Joi = require('joi');
const Movie = require('../models/movie');
const User = require('../models/user');

module.exports.postAddMoviePolicy = async (req, res, next) => {
    console.log(req.body);
    const users = await User.find({email: req.body.user.email, password: req.body.user.password});
    const movies = await Movie.find(req.body.movie);
    const schema = {
        title: Joi.string().required(),
        productionCountries: Joi.array().min(1).required(),
        productionYear: Joi.number().integer().min(1900).max((new Date()).getFullYear()).required(),
        distributor: Joi.string().required(),
        length: Joi.number().integer().min(1).required(),
        genre: Joi.string().required(),
        language: Joi.string().required(),
        subtitles: Joi.string().required(),
        ageLimit: Joi.number().integer().min(1).required(),
        director: Joi.string().required(),
        actors: Joi.array().min(1).required(),
        description: Joi.string().required(),
        youtubeTrailers: Joi.array().min(1).required(),
        reviews: Joi.array().min(1).required(),
    };
    const { error, value } = Joi.validate(req.body.movie, schema, {convert: false});
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        });
    } else if (movies.length > 0) {
        res.status(400).send({
            message: "Movie already exist in the database."
        })
    }else if(users.length === 0){
        res.status(400).send({
            message: "User is not authorized to add new movies"
        })
    } else {
        next();
    }

}