const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require("supertest");
const app = require("../../app");

describe('Check email', () => {
    test('test upload to s3', async () => {
        const testDir = path.dirname(__filename);

        const imagePath = path.join(testDir, 'i.jpeg');
        const imageBuffer = fs.readFileSync(imagePath);
        const file = {
            originalname: 'i.jpeg',
            buffer: imageBuffer,
            mimetype: 'image/jpeg',
        };

        const response = await request(app)
            .get("/api/generate-presigned-url")
            .query({ filename: file.originalname });


        const { presignedUrl } = response.body;
        console.log('presignedUrl: ' + presignedUrl);
        const uploadResponse = await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.mimetype,
            },
        });

        expect(uploadResponse.status).toBe(200);

    }, 10000);
});