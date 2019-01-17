const MovieTheatre = require('../models/movieTheatre');

module.exports.postMovieTheatres = async (req, res, next) => {
    try{
        const theaters = await MovieTheatre.find(req.body.query);
        res.send({
            movie_theatres: theaters
        });
    }catch(error){
        res.send({
            movie_theatres: [],
            message: "No theaters found"
        });
    }
}
