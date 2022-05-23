const express = require('express');
const adminsController = require("../controllers/admins.controller");

let router = express.Router();

router.route('/')
.post(adminsController.postAdmin)




router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;