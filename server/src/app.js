const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const api = require('./routes/api')

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')))

app.use('/v1', api)
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})
module.exports = app