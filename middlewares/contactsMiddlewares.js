const { contactsValidator, putContactValidator, isReadValidator } = require('../helpers/dataValidator')

const checkBody = (req, res, next) => {
    console.log(req.body)
    const { error } = contactsValidator(req.body)
    console.log(error)

    if (error) return res.status(400)
        .json({ message: `Field ${error.details[0].context.key} is required` })

    next()
}

const checkHasBody = (req, res, next) => {
    if (!Object.keys(req.body).length) return res.status(400)
        .json({ message: "Missing fields" })

    const { error } = putContactValidator(req.body)

    if (error) {

        return res.status(400)
            .json({ message: `Field ${error.details[0].context.key} is required` })
    }
    next()

}

const checkPatchIsRead = (req, res, next) => {
    if (req.body.isRead === undefined) {
        return res.status(400).json({ message: 'Field isRead is required' })
    }
    if (Object.keys(req.body).length > 1) {
        return res.status(400).json({ message: "Bad request" })
    }

    const { error } = isReadValidator(req.body)

    if (error) return res.status(400)
        .json({ message: `Field ${error.details[0].context.key} is required` })
    next()
}



module.exports = {
    checkBody,
    checkHasBody,
    checkPatchIsRead
}