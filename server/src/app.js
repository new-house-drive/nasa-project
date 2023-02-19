const express = require('express')
const app = express()

const planetsRouter = require('./routes/planets/planets.router.js')
app.use(express.json())
app.use(planetsRouter)

module.exports = app