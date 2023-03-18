const express = require('express')

const { checkBody } = require('../middlewares/booksMiddlewares')
const { getBooks, addBook, getBookById } = require('../controllers/booksControllers')

const booksRouter = express.Router()

booksRouter.route('/')
    .get(getBooks)
    .post(checkBody, addBook)

booksRouter.route('/:id')
    .get(getBookById)
    .delete()
    .put()

booksRouter.route('/:id/isRead')
    .patch()

module.exports = booksRouter