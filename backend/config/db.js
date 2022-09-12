const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');
const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected host: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB