const mongoose = require('mongoose');

const Schema = mongoose.Schema;

movieSessionSchema = new Schema({
    movieID = {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
        }
    },
    
})