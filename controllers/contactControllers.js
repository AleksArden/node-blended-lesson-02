const Contact = require('../models/contactsModel')

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()

        res.status(200).json(contacts)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const addContact = async (req, res) => {

    try {

        const contact = await Contact.create(req.body)


        res.status(201).json(contact)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }

}
// const getBookById = async (req, res) => {
//     try {
//         const { id } = req.params

//         const book = await Book.findById(id)

//         res.status(200).json(book)

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server error' })
//     }
// }

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params

        const contact = await Contact.findByIdAndDelete(id)
        if (!contact) return res.status(404).json({ message: "contact not found" })
        res.status(200).json({ message: "Contact deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const updateContact = async (req, res) => {
    try {
        const { id } = req.params

        const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

        if (!contact) return res.status(404).json({ message: "contact not found" })
        res.status(200).json(contact)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// const patchIsRead = async (req, res) => {
//     try {
//         const { id } = req.params
//         const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

//         if (!contact) return res.status(404).json({ message: "book not found" })
//         res.status(200).json({ isRead: book.isRead })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server error' })
//     }
// }



module.exports = {
    getContacts,
    addContact,

    deleteContact,
    updateContact,

}