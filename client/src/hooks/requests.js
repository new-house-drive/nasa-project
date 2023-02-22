const API_URL = 'http://localhost:8000/'

async function httpGetPlanets() {
  const response = await fetch(`http://localhost:8000/planets`)
  return await response.json()
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch('http://localhost:8000/launches')
  const fethedLaunches = await response.json()
  return fethedLaunches.sort((a, b) => a.flightNumber - b.flightNumber) 
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
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