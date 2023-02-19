const http = require('http')
const app = require('./app.js')


const PORT = process.env.PORT || 8000
const server = http.createServer(app)

server.listen(PORT, () => {
    try{
    //throw new Error('Vasha mamka')
    console.log(`✔️  It works, for now. ${PORT}`)
    }
    catch(error) {
        console.log(`💀  ${error} is threating your app!`)
    }
})