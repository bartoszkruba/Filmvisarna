const mongoose = require('mongoose');

const schema = mongoose.Schema;

const movieSchema = schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Movie', movieSchema);
