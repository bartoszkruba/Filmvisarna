const Joi = require('joi');
const Movie = require('../models/movie');
const User = require('../models/user');

module.exports.postAddMoviePolicy = async (req, res, next) => {
    req.body.productionCountries = req.body.productionCountries.split(',');
    req.body.productionYear = parseInt(req.body.productionYear);
    req.body.ageLimit = parseInt(req.body.ageLimit);
    req.body.length = parseInt(req.body.length);
    req.body.actors = req.body.actors.split(',');
    req.body.youtubeTrailers = req.body.youtubeTrailers.split(',');
    req.body.reviews = JSON.parse(req.body.reviews);
    req.body.user = JSON.parse(req.body.user)
    const movies = await Movie.find({title:req.body.title});
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
        user: Joi.object()
    };
    const { error, value } = Joi.validate(req.body
        , schema, {convert: false});
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        });
    } else if (movies.length > 0) {
        res.status(400).send({
            message: "Movie already exist in the database."
        })
    }else {
        next();
    }

}