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
            error: 'Emailen finns redan i våran databas'
        });
    } else if (error) {
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).send({
                    error: 'Du måste ange en giltig email adress'
                })
                break;
            case 'name':
                res.status(400).send({
                    error: 'Du måste ange ett giltigt namn'
                })
                break;
            case 'password':
                res.status(400).send({
                    error: `Lösenordet som du angivet matchade inte följande regler:
                    
                    1. Det får endast innehålla följande karaktärer:liten bokstav, stor bokstav och siffror
                    
                    2. Det måste vara minst 8 karaktärer långt men inte längre än 32
                    `
                })
                break;
            default:
                res.status(400).send({
                    error: 'Ogiltig registrerings information'
                })
                break;
        }
    }else{
        next();
    }
}