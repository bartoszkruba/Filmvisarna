const mongoose = require('mongoose');

const Schema = mongoose.Schema;

movieTheatreSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seats: {
        type: String,
        required: true
    },
    seatsPerRow: [
        {
            type: Number
        }
    ]
});

module.exports = mongoose.model('MovieTheatre', movieTheatreSchema);