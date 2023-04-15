const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }

},
    { versionKey: false })

const Contact = model('contact', contactSchema)

module.exports = Contact