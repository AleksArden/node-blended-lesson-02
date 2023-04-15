const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.exists({ email })

        if (user) {
            return res.status(409).json({ message: 'User with such  email exists.Be more creative' })
        }

        const newUser = await User.create(req.body)

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
        newUser.token = token
        await newUser.save()

        res.status(201).json({ token: newUser.token, user: { name: newUser.name, email: newUser.email } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Oops, something went wrong" })
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" })
        }

        const isPassValid = await user.checkPassword(password, user.password)
        if (!isPassValid) {
            return res.status(401).json({ message: "Wrong password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        user.token = token
        await user.save()

        res.status(200).json({ token: user.token, user: { name: user.name, email: user.email } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Oops, something went wrong" })
    }
}

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { token: null })
        res.sendStatus(204)
    } catch (error) {
        res.Status(500).json({ message: "Oops, something went wrong" })
    }
}
const getCurrent = (req, res) => {
    const { user } = req
    res.status(200).json(user)
}


module.exports = {
    signup,
    signin,
    logout,
    getCurrent
}