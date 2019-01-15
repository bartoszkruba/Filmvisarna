const mongoose = require('mongoose');

// Getting mongoose Schema into a variable
const schema = mongoose.Schema;

// Creating schema for movie
const movieSchema = schema({
    title: {
        type: String,
        required: true
    },
    productionCountries: {
        type: Array,
        required: true
    },
    productionYear: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    subtitles: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ageLimit: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    youtubeTrailers: {
        type: Array,
        required: true
    },
    reviews: [
        {
            source: {
                type: String,
                required: true
            },
            quote: {
                type: String,
                required: true
            },
            stars: {
                type: Number,
                required: true
            },
            max:{
                type: Number,
                required: true
            }
        }
    ]
});

// Exporting mongoose model with name Movie and movie Schema
module.exports = mongoose.model('Movie', movieSchema);
