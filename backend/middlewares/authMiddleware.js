const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// var authorization;
// var token;
const auth = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401)
        throw new Error("Token is required")
    }
    // check if there is a user with this authorization
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user with the token
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch (error) {
            console.log(error)
            throw new Error('Unauthorized, Invalid Credential')
        }
    }
})

const user = asyncHandler(async () => {

})

module.exports = { auth, user }