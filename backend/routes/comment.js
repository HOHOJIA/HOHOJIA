const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

// post
router.post("/add", commentController.addComment);
router.post("/delete", commentController.deleteComment);

module.exports = router;
