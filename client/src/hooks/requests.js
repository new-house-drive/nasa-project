const API_URL = 'http://localhost:8000/'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}planets`)
  return await response.json()
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}launches`)
  const fethedLaunches = await response.json()
  return fethedLaunches.sort((a, b) => a.flightNumber - b.flightNumber) 
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    })
  }
  catch (error) {
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};