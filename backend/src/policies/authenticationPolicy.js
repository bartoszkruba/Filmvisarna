const Joi = require('joi');
const User = require('../models/user');

module.exports.postRegister = async (req, res, next) => {
    const user = await User.find({ email: req.body.user.email });
    console.log("Chuj " + user.length);
    const schema = {
        name: Joi.string().regex(
            new RegExp('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
        ),
        email: Joi.string().email().required(),
        password: Joi.string().regex(
            new RegExp('[a-zA-Z0-9]{9,32}$')
        )
    }

    const { error, value } = Joi.validate(req.body.user, schema, { convert: false });

    if (user.length > 0) {
        res.status(400).send({
            error: 'Email already exist in database'
        });
    } else if (error) {
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).send({
                    error: 'You must provide a valid email adress'
                })
                break;
            case 'name':
                res.status(400).send({
                    error: 'You must provide a valid name'
                })
                break;
            case 'password':
                res.status(400).send({
                    error: `The password provided failed to match the following rules:
                    
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    
                    2. It must be at least 8 characters in length and not greater than 32 characters in length
                    `
                })
                break;
            default:
                res.status(400).send({
                    error: 'Invalid registration information'
                })
                break;
        }
    }
    next();
}