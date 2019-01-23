const Joi = require('joi');

module.exports.addMovieSessionPolicy = (req, res, next) => {
    const date = new Date();
    const schema = {
        movieID: Joi.string(),
        movieTheatreID: Joi.string(),
        year: Joi.number().integer().min(date.getFullYear()),
        month: Joi.number().integer().min(date.getMonth() + 1),
        day: Joi.number().integer().min(1).max(31),
    };
    toValidate = {
        movieID: req.body.movieSession.movieID,
        movieTheatreID: req.body.movieSession.movieTheatreID,
        year: req.body.movieSession.date.year,
        month: req.body.movieSession.date.month,
        day: req.body.movieSession.date.day
    }
    const { error, value } = Joi.validate(toValidate
        , schema, { convert: false });
    if (error) {
        res.status(400).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
}