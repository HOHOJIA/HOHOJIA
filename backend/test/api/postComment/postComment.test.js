const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");

const postBody = {
  userId: 1,
  recipeId: 2,
  replyCommentId: null,
  content: "好好吃喔喔",
};

const invalidPostBody = {
  userId: null,
  recipeId: 2,
  replyCommentId: null,
  content: "好好吃喔喔",
};

describe("POST /api/1.0/comment/add", () => {
  beforeAll(async () => {
    console.log("setUp");
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await executeSql(path.join(__dirname, "./testData/init_test_db.sql"));
  });

  afterAll(async () => {
    console.log("tearDown");
    await executeSql(path.join(__dirname, "../testData/clear_test_db.sql"));
    await connectionPromise.end();
  });

  it("should create a comment", async () => {
    const res = await request(app).post("/api/1.0/comment/add").send(postBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.comment.content).toEqual("好好吃喔喔");
  });

  it("should receive unauthorized", async () => {
    const res = await request(app)
      .post("/api/1.0/comment/add")
      .send(invalidPostBody);
    expect(res.statusCode).toBe(401);
  });
});
