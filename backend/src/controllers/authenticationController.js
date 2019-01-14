const User = require('../models/user');

module.exports.postRegister = async (req, res, next) => {
    console.log(req.body.user);
    try{
        await new User({
            name: req.body.user.name,
            email: req.body.user.email,
            password: req.body.user.password,
            admin: false,
            bookedTickets: []
        }).save()
        res.send({
            message: 'Användare registrerad'
        });
    }catch(error){
        res.status(400).send({
            error: 'Could not add user to database'
        })
    }
}

module.exports.postValidate = async (req, res, next) => {
    const users = await User.find({email: req.body.user.email, password: req.body.user.password});
    if(users.length > 0){
        res.send({
            validated: true,
            message: 'User matched database'
        })
    }else{
        res.send({
            validated: false,
            message: 'user not found in database'
        })
    }
}