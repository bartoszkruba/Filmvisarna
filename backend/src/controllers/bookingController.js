const User = require('../models/user');

module.exports.setBookedTicket = async (req, res, next) => {
    const users = await User.findOne({ email: req.body.user.email, password: req.body.user.password });
    if (users !== null) {
        try {
            users.bookedTickets.push(req.body.ticket);
            users.save();
            res.send({
                message: 'Biljetten är sparad',
                bookedTickets: users.bookedTickets,
            });
        } catch (error) {
            res.status(400).send({
                error: 'Kunde inte boka biljetten'
                
            })
            
        }
    } else {
        res.send({
            validated: false,
            message: 'användaren finns inte i databasen'
        })
    }

}