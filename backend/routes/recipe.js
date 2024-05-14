const express = require('express');
const recipeController = require('../controller/recipeController');
const router = express.Router();
const auth = require("../utils/auth");

router.post('/',
    recipeController.postRecipeValidator,
    auth.verifyToken,
    recipeController.postRecipe
);

router.get('/:recipeId',
    recipeController.getRecipeValidator,
    recipeController.getRecipe
);

module.exports = router;