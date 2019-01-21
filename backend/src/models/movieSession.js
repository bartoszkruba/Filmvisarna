const mongoose = require('mongoose');

const Schema = mongoose.Schema;

movieSessionSchema = new Schema({
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    date: {
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        day: {
            type: Number,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    movieTheatreID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MovieTheatre'
    },
    freePlaces: []
});

module.exports = mongoose.model("MovieSession", movieSessionSchema);