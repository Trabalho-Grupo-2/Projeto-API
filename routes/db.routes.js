const express = require('express');
const dbController = require("../controllers/db.controller");

let router = express.Router();

// router.route('/login')
//     .post(dbController.getUser)

router.route('/patients')
    .post(dbController.postUser)//

router.route('/psychologists')
    .post(dbController.postUser)//

// router.route('/patients/:patient_id')
//     .get(dbController.getUser)
//     .delete(dbController.deleteUser)
//     .patch(dbController.patchUser)

// router.route('/psychologists/:psychologist_id')
//     .get(dbController.getUser)
//     .delete(dbController.deleteUser)
//     .patch(dbController.patchUser)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'EmoChamp: Not Found' });
})

module.exports = router;