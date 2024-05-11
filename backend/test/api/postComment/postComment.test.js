const request = require("supertest");
const app = require("../../../app");
const executeSql = require("../../testUtils/testUtils").executeSql;
const connectionPromise = require("../../../config/db").connectionPromise;
const path = require("path");

// test token
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE1MzMwMTg1LCJleHAiOjE3MTU0MTY1ODV9.XQ8D33CCtvV35w_6NrT4G6zf93feCmuAccONddErGoQ";

const postBody = {
  recipeId: 1,
  replyCommentId: null,
  content: "好好吃喔喔",
};

const invalidPostBody = {
  replyCommentId: null,
  content: "好好吃喔喔",
};
// mock auth
jest.mock("../../../utils/auth", () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.decodedToken = { id: 1, iat: 1715330185, exp: 1715416585 };
    next();
  }),
}));

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
    const res = await request(app)
      .post("/api/1.0/comment/add")
      .set("authorization", `Bearer ${token}`)
      .send(postBody);
    expect(res.statusCode).toBe(200);
    // expect(res.body.data.comment.content).toEqual("好好吃喔喔");
  });

  it("should receive unauthorized", async () => {
    const res = await request(app)
      .post("/api/1.0/comment/add")
      .send(invalidPostBody);
    expect(res.statusCode).toBe(401);
  });
});
