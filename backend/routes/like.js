const express = require("express");
const router = express.Router();
const likeController = require("../controller/likeController");
const auth = require("../utils/auth");

// post
router.post("/", auth.verifyToken, likeController.like);

module.exports = router;
