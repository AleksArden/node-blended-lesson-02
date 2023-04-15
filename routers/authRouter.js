const { Router } = require('express')
const { checkUser, checkUserLogin, protect } = require('../middlewares/authMiddleware')
const { signup, signin, logout, getCurrent } = require('../controllers/authController')


const authRouter = Router()

authRouter.route('/signup')
    .post(checkUser, signup)

authRouter.route('/signin')
    .post(checkUserLogin, signin)

authRouter.route('/logout')
    .post(protect, logout)
authRouter.route('/current')
    .get(getCurrent)

module.exports = authRouter