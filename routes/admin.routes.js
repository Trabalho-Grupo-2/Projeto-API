const express = require('express');
const adminController = require("../controllers/admin.controller");

let router = express.Router();

router.route('/')
.post(adminController.postAdmin)




router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;