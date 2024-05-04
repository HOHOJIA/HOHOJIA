const multer = require("multer");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

require("dotenv").config();

module.exports = {
  uploadPicture: () => {
    const upload = multer({
      storage: multer.memoryStorage(),
    });
    return upload;
  },
  /**
   * upload the file from client to the S3
   * @param {Object} file - The file from client
   * @returns {string}
   */
  // uploadToS3: async (file) => {
  //     const {
  //         AWS_ACCESS_KEY_ID,
  //         AWS_SECRET_ACCESS_KEY,
  //         S3_BUCKET_REGION,
  //         BUCKET_NAME,
  //     } = process.env;
  //     const key = Date.now().toString() + '-' + file.originalname;
  //     const s3Client = new S3Client({
  //         region: S3_BUCKET_REGION,
  //         credentials: {
  //             accessKeyId: AWS_ACCESS_KEY_ID,
  //             secretAccessKey: AWS_SECRET_ACCESS_KEY,
  //         },
  //     });
  //     const command = new PutObjectCommand({
  //         Bucket: BUCKET_NAME,
  //         Key: key,
  //         Body: file.buffer,
  //         ContentType: file.mimetype,
  //     });
  //     await s3Client.send(command);
  //     return `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;
  // },
  checkEmail: async (email) => {
    const emailRegex =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return emailRegex.test(email);
  },
  generateHashPassword: async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  /**
   * check the input password
   * @param {string} input - The input password from client
   * @param {Object} real - The hashed password in db
   * @returns {boolean}
   */
  confirmPassword: async (input, real) => {
    return bcrypt.compare(input, real);
  },
  encryptCursor: async (cursor) => {
    const encrypted = CryptoJS.AES.encrypt(
      cursor.toString(),
      process.env.SECRET
    ).toString();
    return encrypted;
  },
  decryptCursor: async (encryptedCursor) => {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedCursor,
      process.env.SECRET
    );
    const decryptedCursor = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return parseInt(decryptedCursor, 10);
  },
  formatTime: () => {
    function formatWithZero(num) {
      return num < 10 ? "0" + num : num;
    }
    // createdAt format
    const currentTime = new Date();
    const offset = -currentTime.getTimezoneOffset(); // local時區偏移量
    const taiwanOffset = -480; // 台灣 UTC+8 == -480分鐘
    const taiwanTime = new Date(
      currentTime.getTime() + (offset + taiwanOffset) * 60 * 1000
    );

    const createdAt = `${taiwanTime.getFullYear()}-${formatWithZero(
      taiwanTime.getMonth() + 1
    )}-${formatWithZero(taiwanTime.getDate())}T${formatWithZero(
      taiwanTime.getHours()
    )}:${formatWithZero(taiwanTime.getMinutes())}:${formatWithZero(
      taiwanTime.getSeconds()
    )}Z`;
    return createdAt;
  },
  /** Conver time to YYYY-MM-DDTHH:MM:SSZ */
  converTimeFormat: (date) => {
    return new Date(date).toISOString().split('.')[0] + "Z";;
  }
};
