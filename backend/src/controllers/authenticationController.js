const User = require('../models/user');

module.exports.postRegister = async (req, res, next) => {
    try{
        await new User({
            name: req.body.user.name,
            email: req.body.user.email,
            password: req.body.user.password,
            admin: false,
            bookedTickets: []
        }).save()
        res.send({
            message: 'User Registered'
        });
    }catch(error){
        res.status.send({
            error: 'Could not add user to database'
        })
    }
}