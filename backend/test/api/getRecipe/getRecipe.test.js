const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");

describe("GET /api/1.0/recipe", () => {
  beforeAll(async () => {
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await executeSql(path.join(__dirname, "./testData/init_test_db.sql"));
  });

  afterAll(async () => {
    await connectionPromise.end();
  });

  it("should get recipe", async () => {
    const existRecipeId = 1;

    const res = await request(app)
      .get(`/api/1.0/recipe/${existRecipeId}`)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.data.recipeId).toEqual(existRecipeId);
    expect(res.body.data.cookTime).toBe(30);
    expect(res.body.data.quantity).toBe(4);
    expect(res.body.data.comments).toHaveLength(2);
    expect(res.body.data.tags).toHaveLength(2);
    expect(res.body.data.steps).toHaveLength(2);
    expect(res.body.data.ingredients).toHaveLength(2);
    expect(res.body.data.imageUrl).toBe("https://i.imgur.com/JOKsNeT.jpeg");
  });

  it("should not found recipe", async () => {
    const notExistId = 2;
    const res = await request(app)
      .get(`/api/1.0/recipe/${notExistId}`)
      .send({});
    expect(res.statusCode).toBe(404);
  });
});
