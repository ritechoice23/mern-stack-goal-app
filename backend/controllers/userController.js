const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const User = require("../models/User")
class userController {
    // @desc Authenticate a user
    // @route Post /api/users/login
    // @access Public
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body
        // get user
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: this.generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    })
    // @desc get authenticated user data
    // @route get /api/users/:userId
    // @access Public
    getAuthUser = asyncHandler(async (req, res) => {
        res.json({ msg: 'user controller', data: req.user })
    })
    // @desc Register new user
    // @route Post /api/users/register
    // @access Public
    register = asyncHandler(async (req, res) => {
        const { password, email, name } = req.body
        if (!password || !email || !name) {
            res.status(400)
            throw new Error('Add all feilds')
        }
        // check if user exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400)
            throw new Error('User already exist')
        }

        // hass password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create user
        const user = await User.create({
            name, email, password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: this.generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    })

    generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
    }
}

module.exports = new userController();