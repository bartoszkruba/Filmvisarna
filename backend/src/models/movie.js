const mongoose = require('mongoose');

const schema = mongoose.Schema;

const movieSchema = schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    }
});

module.exports = mongoose.model('Movie', movieSchema);