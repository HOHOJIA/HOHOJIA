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
        const response = await axios.get(
            `http://localhost:3000/api/generate-presigned-url`, {
            params: {
                filename: file.originalname,
            },
        });
        console.log(response.data);
        const { presignedUrl } = response.data;
        console.log('presignedUrl: ' + presignedUrl);
        const uploadResponse = await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.mimetype,
            },
        });

        expect(uploadResponse.status).toBe(200);

    }, 10000);
});