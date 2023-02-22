const express = require('express')

const router = express.Router()
const { getAllLaunches } = require('./launches.controller')

router.get('/launches', getAllLaunches)

module.exports = router
