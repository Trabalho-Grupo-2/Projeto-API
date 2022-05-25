const express = require('express');
const patientsController = require("../controllers/patients.controller");

let router = express.Router();


router.route('/')
.post(patientsController.postPatient)

router.route('/:patient_id')
.get(patientsController.getPatientById)
.delete(patientsController.deletePatientById)
.patch(patientsController.patchPatientById)


router.all('*', function (req, res) {
    res.status(404).json({ sucess: false, message: 'EmoChamp: Route Not Found' });
})

module.exports = router;