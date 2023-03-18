const Joi = require('joi')

const booksValidator = (data) => Joi.object()
    .keys({
        title: Joi.string().min(2).max(255).required(),
        author: Joi.string().min(2).max(55).required(),
        image: Joi.string().uri().required(),
        plot: Joi.string().min(2).max(555).required(),
        isRead: Joi.boolean(),
    })
    .validate(data)

module.exports = booksValidator