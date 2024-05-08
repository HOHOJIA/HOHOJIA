const s3 = require('../../utils/s3presign');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
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

        const result = await s3.uploadToS3(file);
        
        const response = await axios.get(result);
        expect(response.status).toBe(200); 
        
    },30000);
});