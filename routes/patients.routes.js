const express = require('express');
const patientsController = require("../controllers/patients.controller");

let router = express.Router();





router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;