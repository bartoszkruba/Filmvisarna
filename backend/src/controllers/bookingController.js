const User = require('../models/user');
const uniqid = require('uniqid');
const MovieSession = require('../models/movieSession');
const Bcrypt = require('bcrypt');
const config = require('../util/startupConfig')
const emailTransporter = config.emailTransporter;

module.exports.setBookedTicket = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.user.email});
    const session = await MovieSession.findOne({ _id: req.body.ticket.sessionID }).populate('movieID').populate('movieTheatreID');
    if (user && Bcrypt.compareSync(req.body.user.password, user.password) && checkPlaces(session, req.body.ticket.placeNumbers)) {
        console.log("Verified");
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
                    + parseInt(req.body.ticket.pensioner),
                placeNumbers: req.body.ticket.placeNumbers
            };
            if (session.freePlaces - bookedMovie.totalTickets >= 0 && bookedMovie.totalTickets === bookedMovie.placeNumbers.length) {
                user.bookedTickets.push(bookedMovie);
                user.save();
                session.freePlaces -= bookedMovie.totalTickets;
                SetupPlacesOnSession(session, req.body.ticket.placeNumbers);
                session.save();
                res.send({
                    message: 'Biljetten är sparad',
                    orderID: bookedMovie.orderID
                });

                const message = generateEmailMessage(bookedMovie);

                const mailOptions = {
                    from: config.email,
                    to: user.email,
                    subject: "Boknings informations",
                    text: message
                }

                emailTransporter.sendMail(mailOptions);

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
        console.log("Not Verified");
        res.send({
            validated: false,
            message: 'användaren finns inte i databasen'
        });
    }
}

function checkPlaces(session, places) {
    for (let i = 0; i < places.length; i++) {
        placeNumber = places[i];
        const sessionPlace = session.places.find(cur => {
            return cur.seatNumber === placeNumber;
        });
        if (!sessionPlace || sessionPlace.booked) return false;
    }
    return true;
}

function SetupPlacesOnSession(session, places) {
    for (let i = 0; i < places.length; i++) {
        for (let j = 0; j < session.places.length; j++) {
            if (session.places[j].seatNumber === places[i]) {
                session.places[j].booked = true;
            }
        }
    }
}

function generateEmailMessage(bookedMovie){
    let placeNumbers = "";

    for(let i = 0; i< bookedMovie.placeNumbers.length; i++){
        placeNumbers += bookedMovie.placeNumbers[i] + ", ";
    }

    const message = `
                Ditt bokningsnummer: ${bookedMovie.orderID}
                Film: ${bookedMovie.title}
                Plats: ${bookedMovie.theatre}
                Datum: ${bookedMovie.date}
                Tid: ${bookedMovie.time}
                Antal biljetter: ${bookedMovie.totalTickets}
                Vuxna: ${bookedMovie.adults}
                Barn: ${bookedMovie.children}
                Pensionär: ${bookedMovie.pensioner}
                Platser: ${placeNumbers}

                Pris: ${bookedMovie.price} SEK
                `
    return message
}