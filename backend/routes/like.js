const express = require("express");
const router = express.Router();
const likeController = require("../controller/likeController");
const auth = require("../utils/auth");

// post
router.post("/", auth.verifyToken, likeController.like);
router.post("/unlike", auth.verifyToken, likeController.unlike);

module.exports = router;
