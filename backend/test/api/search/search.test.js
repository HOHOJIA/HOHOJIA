const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");
// mock Redis
jest.mock("redis", () => jest.requireActual("redis-mock"));

describe("GET /api/1.0/search?title=布雷", () => {
  beforeAll(async () => {
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await executeSql(path.join(__dirname, "./testData/init_test_db.sql"));
  });

  afterAll(async () => {
    await connectionPromise.end();
  });

  it("should retrieve search results with titles containing 布雷", async () => {
    const res = await request(app).get("/api/1.0/search?title=布雷");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recipes[0].recipeId).toBe(1);
    expect(res.body.data.recipes[0].title).toBe("焦糖烤布雷");
    expect(res.body.data.recipes[0].imgUrl).toBe(
      "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );
    expect(res.body.data.recipes[0].ingredients).toHaveLength(2);
  });

  it("should retrieve search results with tag containing 甜點", async () => {
    const res = await request(app).get("/api/1.0/search?tag=甜點");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recipes[0].recipeId).toBe(1);
    expect(res.body.data.recipes[0].title).toBe("焦糖烤布雷");
    expect(res.body.data.recipes[0].imgUrl).toBe(
      "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );
    expect(res.body.data.recipes[0].ingredients).toHaveLength(2);
  });

  it("should not find any recipes and return an error message", async () => {
    const res = await request(app).get("/api/1.0/search?title=芒果");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("No recipes found");
  });
});
