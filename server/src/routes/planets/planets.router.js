const express = require('express')

const router = express.Router()
const {getAllPlanets}= require('./planets.controller')

router.get('/planets', getAllPlanets)

module.exports = router