const express = require('express');
const recipeController = require('../controller/recipeController');
const router = express.Router();

router.post('/',
    recipeController.postRecipeValidator,
    recipeController.postRecipe
);

module.exports = router;