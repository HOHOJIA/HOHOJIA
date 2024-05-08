const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");

describe("GET /api/1.0/getAllRecipes?sort=like", () => {
  beforeAll(async () => {
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await executeSql(path.join(__dirname, "./testData/init_test_db.sql"));
  });

  afterAll(async () => {
    await connectionPromise.end();
  });

  it("should retrieve search results sorted by dailyLike", async () => {
    const res = await request(app).get("/api/1.0/getAllRecipes?sort=like");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recipes[0].recipeId).toBe(2);
    expect(res.body.data.recipes[0].title).toBe("焦糖烤布雷");
    expect(res.body.data.recipes[0].imgUrl).toBe(
      "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );
    expect(res.body.data.recipes[0].ingredients).toHaveLength(2);
  });

  it("should retrieve search results sorted by time", async () => {
    const res = await request(app).get("/api/1.0/getAllRecipes?sort=time");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recipes[0].recipeId).toBe(1);
    expect(res.body.data.recipes[0].title).toBe("焦糖烤布雷");
    expect(res.body.data.recipes[0].imgUrl).toBe(
      "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );
    expect(res.body.data.recipes[0].ingredients).toHaveLength(2);
  });
});
