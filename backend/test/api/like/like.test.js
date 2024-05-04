const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");

const postBody = {
  userId: 1,
  recipeId: 1,
};

const invalidPostBody = {
  userId: null,
  recipeId: 1,
};

describe("POST /api/1.0/like", () => {
  beforeAll(async () => {
    console.log("setUp");
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await executeSql(path.join(__dirname, "../testData/init_test_db.sql"));
  });

  afterAll(async () => {
    console.log("tearDown");
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await connectionPromise.end();
  });

  it("should create a like", async () => {
    const res = await request(app).post("/api/1.0/like").send(postBody);
    expect(res.statusCode).toBe(200);
  });

  it("should receive unauthorized", async () => {
    const res = await request(app).post("/api/1.0/like").send(invalidPostBody);
    expect(res.statusCode).toBe(401);
  });
});
