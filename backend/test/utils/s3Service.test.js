const s3 = require('../../utils/s3presign');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
describe('Check email', () => {
    test('test upload to s3', async () => {
        const testDir = path.dirname(__filename);

        const imagePath = path.join(testDir, 'braces.jpg');
        const imageBuffer = fs.readFileSync(imagePath);
        const file = {
            originalname: 'braces.jpg',
            buffer: imageBuffer,
            mimetype: 'image/jpeg',
        };

        const result = await s3.uploadToS3(file);
        // expect(result).toMatch(/^https:\/\/[a-zA-Z0-9\-.]+\.s3\.[a-z]+\.amazonaws\.com\/[0-9]+-fang.png$/);

        const response = await axios.get(result);
        expect(response.status).toBe(200); 
        
    },10000);
});