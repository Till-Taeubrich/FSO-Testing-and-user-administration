require('dotenv').config()

const PORT = 3003
const mongoUrl = process.env.mongoUrl

module.exports = {
    PORT,
    mongoUrl
}