const launchesDatabase = require("./launches.mongo");
const planetsDatabase = require("./planets.mongo");
// const launchesDatabase = new Map()

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER,
  launchDate: new Date("October 13, 2004"),
  mission: "Balshie Premium",
  target: "Kepler-1649 b",
  rocket: "Balshie DF",
  success: true,
  upcoming: true,
  customers: ["Dmytro Faliush", "Olena Metelyk"],
};
// launchesDatabase.set(launch.flightNumber, launch);

/** 
  returns all values in MongoDB launches collection

  version: 1.0 valera
*/
async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __V: 0,
    }
  );
}

/**
 *  returns the latest flight Number in mongo collection. Sorts in DESCENDING ORDER
 *  Used only in saveLaunch()
 *
 *  version 1.0.
 *  valera.
 */

async function getLatestFlightNumber() {
  const latestFlightNumber = await launchesDatabase
    .findOne()
    .sort("-flightNumber").flightNumber;

  if (!latestFlightNumber) return DEFAULT_FLIGHT_NUMBER;

  return latestFlightNumber;
}

/**
 * function addLaunch used to work as a software to 
 * work with Object. deprecated at the moment
 */

function existsLaunchID(id) {
  return launchesDatabase.has(id);
}

function abortLaunch(id) {
  const aborted = launchesDatabase.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

async function saveLaunch(launch) {
  try {
    const planet = await planetsDatabase.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error(
        `🧞 ${launch.mission} cannot be added because ${launch.target} is not a habitable planet. 👾`
      );
    }

    const newFlightNumber = getLatestFlightNumber() + 1;

    await launchesDatabase.updateOne(
      {
        flightNumber: newFlightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (e) {
    console.error(`Could not save launch: ${e}`);
  }
}

/**
 * schedule launch function handles the same
 * logic that saveLaunch() does, but validates
 * that all the data is passed correctly
 *
 * v. 1.0 valera
 */
async function scheduleLaunch(launch) {

  const newFlightNumber = await getLatestFlightNumber() + 1
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["Max Kats", "Steve Huys", "Ostap Vishnou"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch)
}

// function addLaunch(newLaunch) {
//   lastFlightNumber++;
//   launchesDatabase.set(
//     lastFlightNumber,
//     Object.assign(newLaunch, {
//       flightNumber: lastFlightNumber,
//       customers: ["Max Kats", "Steve Huys", "Ostap Vishnou"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

module.exports = {
  getAllLaunches,
  saveLaunch,
  existsLaunchID,
  abortLaunch,
  scheduleLaunch
};
