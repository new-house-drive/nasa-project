const http = require("http");
const app = require("./app.js");
require('dotenv').config()

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  /**
   * * loadLaunchesData() connects to SpaceX API
   * ! Not yet completed
   */
  await loadLaunchesData()

  server.listen(PORT, () => {
    try {
      //throw new Error('Your momma')
      console.log(`✔️  It works, for now. ${PORT}`);
    } catch (error) {
      console.log(`💀  ${error} is threating your app!`);
    }
  });
}

startServer();
