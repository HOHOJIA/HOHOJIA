const express = require("express");
const router = express.Router();
const allRecipesController = require("../controller/allRecipesController");

// get
router.get("/", allRecipesController.getAllRecipes);

module.exports = router;
