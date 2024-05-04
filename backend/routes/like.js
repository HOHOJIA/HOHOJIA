const express = require("express");
const router = express.Router();
const likeController = require("../controller/likeController");

// post
router.post("/", likeController.like);

module.exports = router;
