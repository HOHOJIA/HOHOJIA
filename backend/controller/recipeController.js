const { body, validationResult } = require('express-validator');
const postReceipeHandler = require('../Application/Features/User/Commands/PostRecipe/postRecipeHandler');
const errorMsg = require('../utils/errorMsg');


module.exports = {
    postRecipe: async (req, res) => {
        try {
            const validateResults = validationResult(req);
            if (!validateResults.isEmpty()) {
                errorMsg.badRequest(res, validateResults);
                return;
            }

            const response = await postReceipeHandler.handle(req, res);
            if (response) {
                res.status(201).json(response);
            }
        } catch (error) {
            console.log(error);
            errorMsg.serverError(res);
        }
    },
    postRecipeValidator: [
        body('title').notEmpty().isString(),
        body('quantity').notEmpty(),
        body('cookTime').notEmpty(),
        body('tags', 'Tags is an array of string').isArray(),
        body('steps', 'Steps is an array of object').isArray(),
        body('ingredients', 'Ingredients is an array of object').isArray(),
    ]
}