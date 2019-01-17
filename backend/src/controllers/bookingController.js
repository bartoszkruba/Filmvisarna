const User = require('../models/user');
const uniqid = require('uniqid');
const MovieSession = require('../models/movieSession');

module.exports.setBookedTicket = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.user.email, password: req.body.user.password });
    const session = await MovieSession.findOne({ _id: req.body.ticket.sessionID }).populate('movieID').populate('movieTheatreID');
    if (user) {
        try {
            bookedMovie = {
                orderID: uniqid(),
                title: session.movieID.title,
                theatre: session.movieTheatreID.name,
                time: session.date.time,
                date: session.date.year.toString()
                    + "-"
                    + session.date.month.toString().padStart(2, '0')
                    + "-"
                    + session.date.day.toString().padStart(2, '0'),
                price: parseInt(req.body.ticket.children) * 65
                    + parseInt(req.body.ticket.pensioner) * 75
                    + parseInt(req.body.ticket.adults) * 85,
                adults: parseInt(req.body.ticket.adults),
                children: parseInt(req.body.ticket.children),
                pensioner: parseInt(req.body.ticket.pensioner),
                totalTickets: parseInt(req.body.ticket.adults)
                    + parseInt(req.body.ticket.children)
                    + parseInt(req.body.ticket.pensioner)
            };
            if (session.freePlaces - bookedMovie.totalTickets >= 0) {
                user.bookedTickets.push(bookedMovie);
                user.save();
                res.send({
                    message: 'Biljetten är sparad',
                    orderID: bookedMovie.orderID
                });
                session.freePlaces -= bookedMovie.totalTickets;
                session.save();
            } else {
                res.status(400).send({
                    error: "Det finns inte tillräcklig många lediga platser"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({
                error: 'Kunde inte boka biljetten'

            });
        }
    } else {
        res.send({
            validated: false,
            message: 'användaren finns inte i databasen'
        });
    }
}