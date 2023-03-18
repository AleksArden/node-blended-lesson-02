const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
})
const Book = model('Book', bookSchema)

module.exports = Book