const Joi = require('joi')

const contactsValidator = (data) => Joi.object()
    .keys({
        name: Joi.string().required(),
        number: Joi.string().required(),

    })
    .validate(data)

const putContactValidator = (data) => Joi.object()
    .keys({
        name: Joi.string(),
        number: Joi.string(),

    })
    .validate(data)

const isReadValidator = (data) => Joi.object()
    .keys({
        isRead: Joi.boolean(),
    })
    .validate(data)



module.exports = {
    contactsValidator,
    putContactValidator,
    isReadValidator,
}