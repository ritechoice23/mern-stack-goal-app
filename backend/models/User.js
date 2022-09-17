const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema({
    name: { type: String, required: [true, 'Name feild is required'] },
    email: { type: String, unique: true, required: [true, 'Email feild is required'] },
    password: { type: String, required: [true, 'Password feild is required'] },
}, { timestamps: true })

module.exports = mongoose.model("User", Schema)