const mongoose = require('mongoose');

// Getting mongoose Schema into a variable
const schema = mongoose.Schema;

// Creating schema for movie
const movieSchema = schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    }
});

// Exporting mongoose model with name Movie and movie Schema
module.exports = mongoose.model('Movie', movieSchema);