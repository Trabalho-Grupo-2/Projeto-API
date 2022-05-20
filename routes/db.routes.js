const express = require('express');
const dbController = require("../controllers/db.controller");

let router = express.Router();


router.route('/patients')
.post(dbController.postUser)//

router.route('/psychologists')
.post(dbController.postUser)//

router.route('/login')
.post(dbController.getUser)


// router.route('/patients/:patient_id')
//     .get(dbController.getUser)
//     .delete(dbController.deleteUser)
//     .patch(dbController.patchUser)

// router.route('/psychologists/:psychologist_id')
//     .get(dbController.getUser)
//     .delete(dbController.deleteUser)
//     .patch(dbController.patchUser)

router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;