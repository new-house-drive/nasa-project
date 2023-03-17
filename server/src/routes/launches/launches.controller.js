const { getAllLaunches, existsLaunchID, abortLaunch, saveLaunch } = require('../../models/launches.model')

// Controller function to handle getAllLaunches
async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
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


    saveLaunch(launch)
    return res.status(201).json(launch)

}

function httpAbortLaunch(req, res) {
    const launchID = +req.params.id

    if (existsLaunchID(launchID)) {
        const aborted = abortLaunch(launchID)
        return res.status(200).json(aborted)
    }

    return res.status(404).json({
        error: "ID not found"
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}