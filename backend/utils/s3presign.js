const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

require('dotenv').config();
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION,
    BUCKET_NAME,
} = process.env;

const s3Client = new S3Client({
    region: S3_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

module.exports = {
    getSign: async (filename) => {
        console.log("filename: " + filename);
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
        });
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log(presignedUrl);
        return presignedUrl;
    },
    /**
     * upload the file from client to the S3
     * @param {Object} file - The file from client
     * @returns {string}
     */
    uploadToS3: async (file) => {
        const key = Date.now().toString() + '-' + file.originalname;
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await s3Client.send(command);
        return `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;
    }

}
