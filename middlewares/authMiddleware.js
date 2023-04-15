const User = require('../models/userModel')
require('dotenv').config()

const { userValidator, userLoginValidator } = require('../helpers/authValidator')
const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
    const { error } = userValidator(req.body)

    if (error) {
        return res.status(400).json({ message: `field ${error.details[0].context?.key} is required or invalid` })
    }
    next()
}

const checkUserLogin = (req, res, next) => {
    const { error } = userLoginValidator(req.body)

    if (error) {
        return res.status(400).json({ message: `field ${error.details[0].context?.key} is required or invalid` })
    }
    next()
}

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Not authorized' })

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: 'Not authorized' })
    }

    const currentUser = await User.findById(decoded.id)

    if (!currentUser || currentUser.token !== token) return res.status(401).json({ message: 'Not authorized' })

    req.user = currentUser
    next()
}

module.exports = {
    checkUser,
    checkUserLogin,
    protect,

}