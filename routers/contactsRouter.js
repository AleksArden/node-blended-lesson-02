const express = require('express')

const { checkBody, checkHasBody } = require('../middlewares/contactsMiddlewares')
const { getContacts, addContact, deleteContact, updateContact, } = require('../controllers/contactControllers')
const { protect } = require('../middlewares/authMiddleware')

const contactsRouter = express.Router()

contactsRouter.use(protect)

contactsRouter.route('/')
    .get(getContacts)
    .post(checkBody, addContact)

contactsRouter.route('/:id')
    // .get(getBookById)
    .delete(deleteContact)
    .put(checkHasBody, updateContact)

// contactsRouter.route('/:id/isRead')
//     .patch(checkPatchIsRead, patchIsRead)

module.exports = contactsRouter