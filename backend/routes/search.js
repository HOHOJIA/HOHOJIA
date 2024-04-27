const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController");

// get
router.get("/", searchController.search);

module.exports = router;
