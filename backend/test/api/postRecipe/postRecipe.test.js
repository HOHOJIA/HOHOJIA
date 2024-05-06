const request = require("supertest");
const app = require("../../../app");
const executeSql = require('../../testUtils/testUtils').executeSql;
const connectionPromise = require('../../../config/db').connectionPromise;
const path = require('path');

const postBody = {
    "userId": 1,
    "title": "焦糖烤布蕾",
    "description": "吃了人人都稱讚的焦糖烤布蕾，5種材料就可以做出的法式甜點，烤得酥脆的焦糖，搭配冰涼柔軟細滑的布丁餡，一口大大滿足！",
    "quantity": 4,
    "cookTime": 30,
    "tip": "廚神秘訣",
    "tags": ["甜點", "西式"],
    "imageUrl": "https://i.imgur.com/JOKsNeT.jpeg",
    "steps": [
        {
            "order": 1,
            "imageUrl": "https://i.imgur.com/JOKsNeT.jpeg",
            "description": "鮮奶油、鮮奶和香草莢醬拌勻，中火煮沸"
        },
        {
            "order": 2,
            "imageUrl": "https://i.imgur.com/JOKsNeT.jpeg",
            "description": "蛋黃加糖拌勻，慢慢加入步驟1中，要不停的攪拌"
        }
    ],
    "ingredients": [
        {
            "name": "鮮奶油",
            "size": "250ml"
        },
        {
            "name": "香草精",
            "size": "1匙"
        }
    ]
}

const invalidPostBody = {}


describe("POST /api/1.0/postRecipe", () => {

    beforeAll(async () => {
        console.log("setUp");
        await executeSql(path.join(__dirname, '../testData/clear_test_db.sql'));
        await executeSql(path.join(__dirname, '../testData/init_test_db.sql'));
    })

    afterAll(async () => {
        console.log("tearDown");
        await connectionPromise.end();
    })

    it("should create a recipe", async () => {
        const res = await request(app).post("/api/1.0/recipe").send(postBody);
        expect(res.statusCode).toBe(201);
    });

    it("should receive bad request", async () => {
        const res = await request(app).post("/api/1.0/recipe").send(invalidPostBody);
        expect(res.statusCode).toBe(400);
    });
});

