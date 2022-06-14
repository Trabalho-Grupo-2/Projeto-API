const express = require('express');
const loginController = require("../controllers/login.controller");

let router = express.Router();


router.route('/')
.post(loginController.login)


router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;