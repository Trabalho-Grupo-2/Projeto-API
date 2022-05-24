const express = require('express');
const psychologistsController = require("../controllers/psychologists.controller");

let router = express.Router();


router.route('/')
.post(psychologistsController.postPsychologist)

router.route('/:psychologist_id')
.get(psychologistsController.getPsychologistById)

router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;