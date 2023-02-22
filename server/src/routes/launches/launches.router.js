const express = require('express')

const router = express.Router()
const { httpGetAllLaunches } = require('./launches.controller')

router.get('/launches', httpGetAllLaunches)

module.exports = router
