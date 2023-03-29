const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Test Launches API", () => {
  beforeAll(async ()=> {
    await mongoConnect();
  })

  afterAll(async () => {
    await mongoDisconnect();
  })
  
  describe("Test GET launches", () => {
    test("Expect to be 200", async () => {
      mongoConnect();
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(response.statusCode).toBe(200)
    });
  });

  describe("Test adding a launch to collection", () => {
    completeLaunchData = {
      mission: "Olena Metelyk Vision",
      target: "Kepler-1649 b",
      rocket: "Hex",
      launchDate: "January 17, 2042",
    };

    launchDataWithoutDate = {
      mission: "Olena Metelyk Vision",
      target: "Kepler-1649 b",
      rocket: "Hex",
    };

    launchDataWithoutTarget = {
      mission: "Olena Metelyk Vision",
      rocket: "Hex",
      launchDate: "January 17, 2042",
    };

    launchDataWithInvalidDate = {
      mission: "Olena Metelyk Vision",
      target: "Kepler-1649 b",
      rocket: "Hex",
      launchDate: "Будут бальшиє? Будут і бальшиє в том чіслє.",
    };

    test("Should return 201 Created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("Should return error the parameter is missing.", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutTarget)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing information!  🥺👉👈",
      });
    });

    test("Should return error the date is invalid.", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Date is invalid!  🥺👉👈",
      });
    });
  });
});
