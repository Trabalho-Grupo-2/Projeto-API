const express = require('express');
const psychologistsController = require("../controllers/psychologists.controller");

let router = express.Router();





router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;