const mongoose = require('mongoose');

// Getting mongoose Schema into a variable
const schema = mongoose.Schema;

// Creating schema for movie
const movieSchema = schema({
    Title: {
        type: String
    },
    ProductionCountries: {
        type: String
    },
    ProductionYear: {
        type: String
    },
    Length: {
        type: String
    },
    Genre: {
        type: String
    },
    Language: {
        type: String
    },
    Subtitle: {
        type: String
    },
    Director: {
        type: String
    },
    Actors: {
        type: Array
    },
    Description: {
        type: String
    },
    Age: {
        type: String
    },
    Image: {
        type: String
    }
});

// Exporting mongoose model with name Movie and movie Schema
module.exports = mongoose.model('Movie', movieSchema);