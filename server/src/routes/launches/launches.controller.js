const { getAllLaunches, existsLaunchID, abortLaunch, scheduleLaunch } = require('../../models/launches.model')

// Controller function to handle getAllLaunches
async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
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


    await scheduleLaunch(launch)
    return res.status(201).json(launch)

}

async function httpAbortLaunch(req, res) {
    const launchID = +req.params.id
    const idIsExisting = await existsLaunchID(launchID)
    if (idIsExisting) {
        const aborted = await abortLaunch(launchID)
        if (aborted) {
        return res.status(200).json({
            ok: true
        })
        }
        else {
            return res.status(400).json({
                error: "Launch not aborted!"
            })
        }
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