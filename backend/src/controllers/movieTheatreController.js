const MovieTheatre = require('../models/movieTheatre');

module.exports.postMovieTheatres = async (req, res, next) => {
    try{
        const theaters = await MovieTheatre.find(req.body.query);
        res.send({
            movie_theaters: theaters
        });
    }catch(error){
        res.send({
            movie_theaters: [],
            message: "No theaters found"
        });
    }
}