const { getAllLaunches, addLaunch } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body
    if (!launch.mission 
        || !launch.target 
        || !launch.rocket 
        || !launch.launchDate) 
        {
            return res.status(400).json({
                "error": "Missing information!  🥺👉👈"
            })
    }

    launch.launchDate = new Date(launch.launchDate)

    if(launch.launchDate.toString() === "Invalid Date") {
        return res.status(400).json({
            "error": "Date is invalid!  🥺👉👈"
        })
    }


    addLaunch(launch)
    return res.status(201).json(launch)

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}