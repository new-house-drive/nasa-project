const launches = require("./launches.mongo");
// const launches = new Map()

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addLaunch(newLaunch) {
  lastFlightNumber++;
  launches.set(
    lastFlightNumber,
    Object.assign(newLaunch, {
      flightNumber: lastFlightNumber,
      customers: ["Max Kats", "Steve Huys", "Gazdurbal Kalachakrovich"],
      upcoming: true,
      success: true,
    })
  );
}

function existsLaunchID(id) {
  return launches.has(id);
}

function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

async function saveLaunch(launch) {
  try {
    await launches.updateOne(
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
  addLaunch,
  existsLaunchID,
  abortLaunch,
};
