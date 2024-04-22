const express = require('express');
const router = express.Router();

module.exports = function () {
    router.post('/', (req, res) => {
        // TODO db query
        res.send('XXXXXXXXXXXXXXXXXXXX');
    });
    return router;
};