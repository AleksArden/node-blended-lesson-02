const Joi = require('joi')

exports.userValidator = (data) => Joi.object()
    .keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).required()
    })
    .validate(data)

exports.userLoginValidator = (data) => Joi.object()
    .keys({
        email: Joi.string().required().email(),
        password: Joi.string().min(3).required(),
    })
    .validate(data)