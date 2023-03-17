const launchesDatabase = require("./launches.mongo");
// const launchesDatabase = new Map()

let lastFlightNumber = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date("October 13, 2004"),
  mission: "Balshie +",
  target: "Planeta AZOV",
  rocket: "Balshie DF",
  success: true,
  upcoming: true,
  customers: ["Dmytro Faliush", "Olena Metelyk"],
};

saveLaunch(launch)

// launchesDatabase.set(launch.flightNumber, launch);

/** 
  returns all values in MongoDB launches collection

  version: 1.0 valera
*/
async function getAllLaunches() {
  return await launchesDatabase.find({}, {
    "_id": 0,
    "__V": 0
  });
}

/**
 * function addLaunch used to work as saver
 *  
 *  
 */

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
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
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

module.exports = {
  getAllLaunches,
  saveLaunch,
  existsLaunchID,
  abortLaunch,
};
