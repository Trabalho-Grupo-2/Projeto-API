const express = require('express');
const emotionsControllers = require("../controllers/emotions.controller");

let router = express.Router();


router.route('/')
    .post(emotionsControllers.postEmotion)

router.route('/:emotion_id')
    .get(emotionsControllers.getEmotionById)
    .delete(emotionsControllers.deleteEmotionById)
    .patch(emotionsControllers.patchEmotionById)
//.post(emotionsControllers.postPathByEmotion)



router.all('*', function (req, res) {
    res.status(404).json({
        sucess: false,
        message: 'EmoChamp: Route Not Found'
    });
})

module.exports = router;