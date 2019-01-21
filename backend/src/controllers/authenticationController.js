const User = require('../models/user');
const Bcrypt = require('bcrypt');

module.exports.postRegister = async (req, res, next) => {
    try {
        await new User({
            name: req.body.user.name,
            email: req.body.user.email,
            password: Bcrypt.hashSync(req.body.user.password, 10),
            admin: false,
            bookedTickets: []
        }).save()
        res.send({
            message: 'Användare registrerad'
        });
    } catch (error) {
        res.status(400).send({
            error: 'Could not add user to database'
        })
    }
}

module.exports.postValidate = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.user.email });
    if (user && Bcrypt.compareSync(req.body.user.password, user.password)) {
        res.send({
            validated: true,
            message: 'User matched database',
            user: user.name,
            id: user.id,
            admin: user.admin,
            email: user.email,
            password: req.body.user.password,
        })

    } else {
        res.send({
            validated: false,
            message: 'user not found in database'
        })
    }
}

module.exports.getBookedTickets = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.user.email});
    if (user&& Bcrypt.compareSync(req.body.user.password, user.password)) {
        res.send({
            bookedTickets: user.bookedTickets,
        })
    } else {
        res.send({
            message: 'problem updating bookedTickets'
        })
    }
}