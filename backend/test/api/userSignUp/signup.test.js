const request = require("supertest");
const app = require("../../../app");
const executeSql = require('../../testUtils/testUtils').executeSql;
const connectionPromise = require('../../../config/db').connectionPromise;
const path = require('path');

describe("POST /users/signup", () => {
    beforeAll(async () => {
        await executeSql(path.join(__dirname, '../testData/clear_test_db.sql'));
        await executeSql(path.join(__dirname, './testData/init_test_db.sql'));
    })
    // afterEach(async () => { 
    //     await executeSql(path.join(__dirname, './testData/delete_test_user.sql'));
    // })
    afterAll(async () => {
        await connectionPromise.end();
    })
    test("signup - success: 200", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            name: "test",
            email: "test1@gmail.com",
            password: "test"
          });
    
        expect(newUser.body).toHaveProperty("data");
        expect(newUser.body.data).toHaveProperty("access_token");
        expect(newUser.body.data).toHaveProperty("user");
        expect(newUser.body.data.user).toHaveProperty("id");
        expect(newUser.body.data.user).toHaveProperty("avatar");
    
        expect(newUser.body.data.user.name).toBe("test");
        expect(newUser.body.data.user.email).toBe("test1@gmail.com");
        expect(newUser.body.data.user.provider).toBe("native");
        
        expect(newUser.statusCode).toBe(200);
      });
      test("signup - email is wrong format: 403", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            name: "test",
            email: "testgmail.com",
            password: "test"
          });
          expect(newUser.statusCode).toBe(403);
      });
      test("signup - name can't be empty: 400", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            email: "test1@gmail.com",
            password: "test"
          });
    
          expect(newUser.statusCode).toBe(400);
      });
      test("signup - no email: 400", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            name: "test",
            password: "test"
          });
          expect(newUser.statusCode).toBe(400);
      });
      test("signup - no password: 400", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            name: "test",
            email: "test1@gmail.com"
          });
          expect(newUser.statusCode).toBe(400);
      });
    
      test("signup - user has existed: 403", async () => {
        // const newUser = await request(app)
        //   .post("/api/1.0/users/signup")
        //   .send({
        //     name: "test",
        //     email: "test@gmail.com",
        //     password: "test"
        //   });
        const duplicateUser = await request(app)
          .post("/api/1.0/users/signup")
          .send({
            name: "test",
            email: "test1@gmail.com",
            password: "test"
          });
    
        //   expect(newUser.statusCode).toBe(200);

          expect(duplicateUser.statusCode).toBe(403);
      });
});
