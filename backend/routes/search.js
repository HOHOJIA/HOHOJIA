const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController");
const redis = require("../utils/cache");

// get
router.get("/", redis.cacheTitle, searchController.search);

module.exports = router;
