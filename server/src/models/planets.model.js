const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require('./planets.mongo')

const habitablePlanets = []

const KEPLER_DATA_URL = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv' )
// Service Functions
function isHabitablePlanet(planet) {
  if (isEnoughInsolationFlux(planet) && isDispositionCOnfirmed(planet) && isRadiusOK(planet)) {
    return planet;
  }
}

function isDispositionCOnfirmed(planet) {
  return planet["koi_disposition"] === "CONFIRMED";
}

function isEnoughInsolationFlux(planet) {
  if (planet["koi_insol"] < 0.36) return;
  if (planet["koi_insol"] > 1.12) return;

  return planet;
}

function isRadiusOK(planet) {
    if (planet['koi_prad'] > 1.6) return
    return planet  
}

// Receiving data
function loadPlanetsData(){
  return new Promise((resolve, reject) => {
    fs.createReadStream(KEPLER_DATA_URL)
  // readable.pipe(writable)
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", async (planet) => {
    if (isHabitablePlanet(planet)) {
      // habitablePlanets.push(planet);
      // TODO: replace the code with upsert
      // insert + update = upsert
      // await planets.create({
      //   keplerName: planet.kepler_name
      // })
    }
  })
  .on("end", () => {
    console.log("We are done!");
    resolve();
  })
  .on("error", (err) => {
    console.log("Error!");
    console.log(err);
    reject(err)
  });

  })

}
module.exports = {
    planets: habitablePlanets,
    loadPlanetsData: loadPlanetsData,
}