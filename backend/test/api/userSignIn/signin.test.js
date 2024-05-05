const request = require("supertest");
const app = require("../../../app");
const executeSql = require('../../testUtils/testUtils').executeSql;
const connectionPromise = require('../../../config/db').connectionPromise;
const path = require('path');



describe("POST /users/signin", () => {
    beforeAll(async () => {
        await executeSql(path.join(__dirname, '../testData/clear_test_db.sql'));
        await executeSql(path.join(__dirname, '../userSignUp/testData/init_test_db.sql'));
    })
    afterAll(async () => {
        await connectionPromise.end();
    })
    test("signin - success: 200", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signin")
          .send({
            provider: "native",
            email: "test@gmail.com",
            password: "test"
          });
    
        expect(newUser.body).toHaveProperty("data");
        expect(newUser.body.data).toHaveProperty("access_token");
        expect(newUser.body.data).toHaveProperty("user");
        expect(newUser.body.data.user).toHaveProperty("id");
        expect(newUser.body.data.user).toHaveProperty("avatar");
    
        expect(newUser.body.data.user.name).toBe("test");
        expect(newUser.body.data.user.email).toBe("test@gmail.com");
        expect(newUser.body.data.user.provider).toBe("native");
        
        expect(newUser.statusCode).toBe(200);
      });
      
      test("signin - email can't be empty: 400", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signin")
          .send({
            provider: "native",
            password: "test"
          });
          expect(newUser.statusCode).toBe(400);
      });
      test("signin - user not found: 403", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signin")
          .send({
            provider: "native",
            email: "te@gmail.com",
            password: "test"
          });

          expect(newUser.statusCode).toBe(403);
      });
      test("signin - password can't be empty: 400", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signin")
          .send({
            provider: 'native',
            email: "test@gmail.com"
          });
          expect(newUser.statusCode).toBe(400);
      });
      test("signin - wrong password: 403", async () => {
        const newUser = await request(app)
          .post("/api/1.0/users/signin")
          .send({
            provider: 'native',
            password: '123',
            email: "test@gmail.com"
          });
          expect(newUser.statusCode).toBe(403);
      });

});
