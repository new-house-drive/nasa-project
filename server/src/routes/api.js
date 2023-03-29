/** File is included to export api as a single object to root category
 * 
 */

const express = require('express')

const planetsRouter  = require('./planets/planets.router.js')
const launchesRouter  = require('./launches/launches.router.js')

const api = express.Router()

api.use('/planets', planetsRouter)
api.use('/launches', launchesRouter)

module.exports = api