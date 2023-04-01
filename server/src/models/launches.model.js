const launchesDatabase = require("./launches.mongo");
const planetsDatabase = require("./planets.mongo");
const axios = require("axios");
// const launchesDatabase = new Map()

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
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
 *  returns the latest flight Number in mongo collection. Sorts in DESCENDING ORDER
 *  Used only in saveLaunch()
 *
 *  version 1.0.
 *  valera.
 */

async function getLatestFlightNumber() {
  const latestFlightNumber = await launchesDatabase
    .findOne()
    .sort("-flightNumber");

  if (!latestFlightNumber.flightNumber) return DEFAULT_FLIGHT_NUMBER;

  return latestFlightNumber.flightNumber;
}

/** generic function that gets Query and 
 * searches for it in MongoDB
*/
async function findLaunch(filter) {
  await launchesDatabase.findOne(filter)
}

/**
 * Database connects to the SPACEX_API and 
 * inserts all the launches from there to 
 * our MongoDB.
 * ! Used in public loadLaunchesData() only
 * ! Unfinished! See todo!
 * version 1.0 valera
*/
async function populateDatabase() {
  console.log("Downloading the launches from Elon Musk...");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers: customers,
    };
    console.log(launch.flightNumber, launch.mission);
  }

  // TODO: Populate collection to MongoDB
}


/**
 * * Public methods start here
 */

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
 * existsLaunchID now uses the MongoDB
 * for connection
 *
 * version 1.1.
 * valera
 */
async function existsLaunchID(id) {
  return await findLaunch({
    flightNumber: id,
  });
}
/**
 * abortLaunch function handles the request from
 * the controller and updates the database
 *
 * version 1.1 valera
 */
async function abortLaunch(launch) {
  const abortedLaunch = await launchesDatabase.updateOne(
    {
      flightNumber: launch,
    },
    {
      success: false,
      upcoming: false,
    }
  );

  return abortedLaunch.modifiedCount === 1;
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

    await launchesDatabase.findOneAndUpdate(
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

/**
 * schedule launch function handles the same
 * logic that saveLaunch() does, but validates
 * that all the data is passed correctly
 *
 * v. 1.0 valera
 */
async function scheduleLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["Max Kats", "Steve Huys", "Ostap Vishnou"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

/**
 * * method connects to SpaceX API
 * version 1.1 valera
 */
async function loadLaunchesData() {
  const checkIfDataDownloaded = await findOne({
    flightNumber: 1,
    rocket: "Falcon 1"
  })

  if (checkIfDataDownloaded) {
    console.log("Data is already loaded!")
    return
  }

  await populateDatabase();
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
  scheduleLaunch,
  loadLaunchesData,
};

