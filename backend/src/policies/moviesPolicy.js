const Joi = require('joi');
const Movie = require('../models/movie');

module.exports.postAddMoviePolicy = async (req, res, next) => {
    const movies = await Movie.find(req.body.movie);
    const schema = {
        title: Joi.string(),
        productionCountries: Joi.array(),
        productionYear: Joi.number().integer().min(1900).max(2019),
        distributor: Joi.string(),
        length: Joi.number().integer().min(1),
        genre: Joi.string(),
        language: Joi.string(),
        subtitles: Joi.string(),
        director: Joi.string(),
        actors: Joi.array(),
        description: Joi.string(),
        images: Joi.array(),
        youtubeTrailers: Joi.array(),
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
    } else {
        next();
    }

}