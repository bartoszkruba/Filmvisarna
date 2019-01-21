const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true
    },
    bookedTickets: [
        {
            title: {
                type: String,
                required: true
            },
            orderID: {
                type: String,
                required: true
            },
            theatre: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            adults: {
                type: Number,
                required: true
            },
            children: {
                type: Number,
                required: true
            },
            pensioner: {
                type: Number,
                required: true
            },
            totalTickets: {
                type: Number,
                required: true
            },
            placeNumbers: [],
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);