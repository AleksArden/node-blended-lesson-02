const Book = require('../models/bookModel')

const getBooks = async (req, res) => {
    try {
        const books = await Book.find()

        res.status(200).json(books)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body)

        res.status(201).json(book)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }

}
const getBookById = async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)

        res.status(200).json(book)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getBooks,
    addBook,
    getBookById,
}