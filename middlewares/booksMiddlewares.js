const booksValidator = require('../helpers/dataValidator')

const checkBody = (req, res, next) => {

    const { error, value } = booksValidator(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    req.body = value
    next()
}
module.exports = {
    checkBody
}