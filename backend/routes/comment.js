const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const auth = require("../utils/auth");

// post
router.post("/add", auth.verifyToken, commentController.addComment);
router.post("/delete", auth.verifyToken, commentController.deleteComment);

module.exports = router;
