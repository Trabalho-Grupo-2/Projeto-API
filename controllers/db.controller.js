const db = require("../models/index.js");
const Patients = db.patients;
const Psychologists = db.psychologists;
const Emotions = db.emotions;
const Admins = db.admins;


exports.postUser = async (req, res) => {

    console.log("CREATE USER")

    try {
        let id
        if (req.body.password != req.body.passwordConfirm) {
            res.status(400).json({
                success: false,
                msgs: "Passwords don’t match"
            });
        }
        if (req.url == "/patients") {

            console.log("CREATE PATIENT")

            if (req.body.passwordConfirm == req.body.password) {
                const patient = new Patients({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                await patient.save()
                id = patient._id
            }
        }
        if (req.url == "/psychologists") {

            console.log("CREATE PSYCHOLOGIST")

            if (req.body.passwordConfirm == req.body.password) {
                const psychologist = new Psychologists({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                await psychologist.save()
                id = psychologist._id
            }
        }
        res.status(201).json({
            success: true,
            msg: "New User created.",
            URL: `${req.url}/${id}`
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });
        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later"
        });
    }
}

exports.getUser = async (req, res) => {

    console.log("LOGIN USER")

    try {
        if (req.body.name == "") {
            res.status(400).json({
                success: false,
                msg: "Please provide a username"
            })
        }
        if (req.body.password == "") {
            res.status(400).json({
                success: false,
                msg: "Please provide a password"
            })
        }
        let user
        user = await Patients.findById(req.body.name);
        user = await Psychologists.findById(req.body.name);
        if (user.password == req.body.password) {
            res.status(200).json({
                success: true,
                msg: `User id=${user._id} was logged in successfully.`
            });
        } else {
            res.status(401).json({
                success: false,
                msg: "Incorrect username or password"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later." + err
        });
    }
    res.status(200).json({
        message: 'Login'
    });
}

exports.patchUser = async (req, res) => {
    if (req.url == "/patients") {
        try {

            newPatient = await Patients.findById(req.params.patient._id)

            if (newPatient.patient_id != req.params.patient._id) {
                res.status(403).json({
                    success: false,
                    msg: "URL not assigned to patient"
                })
            }

            if (req.params.patient._id == null) {
                res.status(404).json({
                    success: false,
                    msg: `The pacient with ID ${req.params.patient._id} does not exist`
                })
            }

            if (req.body.name != "") {
                newPatient.name = req.body.name
            }
            if (req.body.description != "") {
                newPatient.description = req.body.description
            }
            if (req.body.email != "") {
                newPatient.email = req.body.email
            }
            if (req.body.password != "") {
                newPatient.password = req.body.password
            }
            if (req.body.avatar != "") {
                newPatient.avatar = req.body.avatar
            }

            await Patients.findByIdAndUpdate(req.params.patient._id, newPatient, {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }).exec();

            res.status(200).json({
                message: `Patient id=${req.params.patient._id} was patched successfully.`
            });


        } catch (err) {
            res.status(500).json({
                success: false,
                msg: "Something went wrong. Please try again later."
            });
        }
    };
    if (req.url == "/psychologists") {
        try {

            newPsychologist = await Psychologists.findById(req.params.psychologist._id)

            if (newPsychologist.psychologist_id != req.params.psychologist._id) {
                res.status(403).json({
                    success: false,
                    msg: "URL not assigned to psychologist"
                })
            }

            if (req.params.psychologist._id == null) {
                res.status(404).json({
                    success: false,
                    msg: `The psychologist with ID ${req.params.psychologist._id} does not exist`
                })
            }

            if (req.body.name != "") {
                newPsychologist.name = req.body.name
            }
            if (req.body.description != "") {
                newPsychologist.description = req.body.description
            }
            if (req.body.email != "") {
                newPsychologist.email = req.body.email
            }
            if (req.body.password != "") {
                newPsychologist.password = req.body.password
            }
            if (req.body.avatar != "") {
                newPsychologist.avatar = req.body.avatar
            }

            await Psychologists.findByIdAndUpdate(req.params.psychologist._id, newPsychologist, {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }).exec();

            res.status(200).json({
                message: `Psychologist id=${req.params.psychologist._id} was patched successfully.`
            });


        } catch (err) {
            res.status(500).json({
                success: false,
                msg: "Something went wrong. Please try again later."
            });
        }
    };
}

exports.deleteUser = async (req, res) => {
    if (req.url == "/patients") {
        try {
            const patient = await Patients.findByIdAndRemove(req.params.patient._id).exec();
            if (!patient)
                res.status(404).json({
                    message: `Cannot delete Patient with id=${req.params.patient._id}. Maybe Patient was not found!`
                });
            else
                res.status(204).json({
                    success: true,
                    msg: `Pacient id=${req.params.patient._id} was deleted successfully.`
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                msg: "Something went wrong. Please try again later."
            });
        };
    };
    if (req.url == "/psychologists") {
        try {
            const psychologist = await Psychologists.findByIdAndRemove(req.params.psychologist._id).exec();
            if (!psychologist)
                res.status(404).json({
                    message: `Cannot delete Psychologist with id=${req.params.psychologist._id}. Maybe Psychologist was not found!`
                });
            else
                res.status(204).json({
                    success: true,
                    msg: `Pshycologist id=${req.params.psychologist._id} was deleted successfully.`
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                msg: "Something went wrong. Please try again later."
            });
        };
    };

};