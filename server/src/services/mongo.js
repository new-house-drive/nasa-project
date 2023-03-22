const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://superuser:tqqVfjRN7fGBH7sO@tocl-xvi.poxwtez.mongodb.net/?retryWrites=true&w=majority"


mongoose.connection.once('open', () => {
    console.log('🧠 MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})
/** Function have been transferred from the server.js
 *  handles the connection to MongoDB
 */
async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}
/** Handles the disconnection from MongoDB
 */
async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}