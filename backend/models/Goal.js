const mongoose = require('mongoose')
const goalSchema = mongoose.Schema({
    text: { type: String, require: [true, "Text is required"] }
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)
