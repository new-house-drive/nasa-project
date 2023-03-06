const http = require('http')
const app = require('./app.js')
const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://superuser:tqqVfjRN7fGBH7sO@tocl-xvi.poxwtez.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000
const server = http.createServer(app)

const {loadPlanetsData} = require('./models/planets.model')

mongoose.connection.once('open', () => {
    console.log('🧠 MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {

    mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    server.listen(PORT, () => {
        try{
        //throw new Error('Vasha mamka')
        console.log(`✔️  It works, for now. ${PORT}`)
        }
        catch(error) {
            console.log(`💀  ${error} is threating your app!`)
        }
    })

}

startServer()