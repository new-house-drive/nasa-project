const http = require("http");
const app = require("./app.js");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const { loadPlanetsData } = require("./models/planets.model");

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
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
