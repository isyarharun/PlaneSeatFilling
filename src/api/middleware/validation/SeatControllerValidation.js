const Joi = require('@hapi/joi')
module.exports = {
    setSeat(req, res, next) {
        const schema = {
            seatArray: Joi.array().items(
                Joi.array().items(
                    Joi.number().min(1).required(), Joi.number().min(1).required()
                ).error(() => {
                    return {
                        message: 'please provide a valid seat input',
                    };
                })
            ).min(1).required(),
            totalPassengers: Joi.number().min(1).required()
        }
        let validate = Joi.validate(req.body, schema)
        if (validate.error == null) {
            next()
        } else {
            res.status(400).send({ error: validate.error.details[0].message })
        }
    }
}
