const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: "",
        },
        avatarURL: {
            type: String,
            default: '',
        }

    },
    { versionKey: false }
);

userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = (candidate, hash) =>
    bcrypt.compare(candidate, hash)

const User = model('user', userSchema)

module.exports = User