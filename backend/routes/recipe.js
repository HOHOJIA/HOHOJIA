const express = require('express');
const recipeController = require('../controller/recipeController');
const router = express.Router();

router.post('/',
    recipeController.postRecipeValidator,
    recipeController.postRecipe
);

router.get('/:recipeId',
    recipeController.getRecipeValidator,
    recipeController.getRecipe
);

module.exports = router;