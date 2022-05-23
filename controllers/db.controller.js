const db = require("../models/index.js");
const Patients = db.patients;
const Psychologists = db.psychologists;
const Emotions = db.emotions;
const Admins = db.admins;

//POST GET USER

exports.postUser = async (req, res) => {

    console.log("POST USER")

    try {
        let id
        if (req.body.password != req.body.passwordConfirm) {
            res.status(400).json({
                success: false,
                msgs: "Passwords don’t match"
            });
        }
        if (req.url == "/patients") {

            console.log("POST PATIENT")

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

            console.log("POST PSYCHOLOGIST")

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

exports.postUser = async (req, res) => {

    console.log("POST USER")

    try {
        let id

        let pat = await Patients.findOne({
            name: req.body.name
        });
        let psy = await Psychologists.findOne({
            name: req.body.name
        });

        if (pat != null || psy != null) {
            return res.status(401).json({
                success: false,
                msgs: "Username already exists"
            })
        }

        if (!req.body && !req.body.username && !req.body.password)
            return res.status(400).json({
                success: false,
                msg: "Username and password are mandatory"
            });

        if (req.url == "/patients") {

            console.log("POST PATIENT")

            const patient = new Patients({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                description: "",
                avatar: "",
                emotionsgame1: [],
                emotionsgame2: []
            })
            let newPat = await patient.save()
            id = newPat._id

        }
        if (req.url == "/psychologists") {

            console.log("POST PSYCHOLOGIST")

            const psychologist = new Psychologists({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                description: "",
                avatar: "",
                patients: []
            })
            let newpsy = await psychologist.save()
            id = newpsy._id
        }

        return res.status(201).json({
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

    console.log("GET USER")

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

//GET DELETE PATCH BY ID

exports.getUserById = async (req, res) => {

    console.log("getUserById")
    let dbPatients = null
    let dbPsychologists = null

    try {
        if (req.url == "/patients/" + req.params.patient_id) {
            console.log("GET PATIENT ID: " + req.params.patient_id);
            dbPatients = await Patients.findById(req.params.patient_id).exec();
        }

        if (req.url == "/psychologists/" + req.params.psychologist_id) {
            console.log("GET PSYCHOLOGIST ID: " + req.params.psychologist_id)
            dbPsychologists = await Psychologists.findById(req.params.psychologist_id).exec();
        }

        console.log(dbPatients)
        console.log(dbPsychologists)

        res.status(200).json({
            success: true,
            msg: "GET USER ID",
            url: `${req.url}`
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later." + err
        });
    }
}

exports.deleteUserById = async (req, res) => {

    console.log("deleteUserById")

    try {
        let id

        if (req.url == "/patients/" + req.params.patient_id) {
            console.log("DELETE PATIENT ID: " + req.params.patient_id);
            id = req.params.patient_id;
        }

        if (req.url == "/psychologists/" + req.params.psychologist_id) {
            console.log("DELETE PSYCHOLOGIST ID: " + req.params.psychologist_id)
            id = req.params.psychologist_id;
        }
        res.status(201).json({
            success: true,
            msg: "DELETE USER ID",
            URL: `${req.url}/${id}`
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later." + err
        });
    }
}

exports.patchUserById = async (req, res) => {

    console.log("patchUserById")

    try {
        let id

        if (req.url == "/patients/" + req.params.patient_id) {
            console.log("PATCH PATIENT ID: " + req.params.patient_id);
            id = req.params.patient_id;
        }

        if (req.url == "/psychologists/" + req.params.psychologist_id) {
            console.log("PATCH PSYCHOLOGIST ID: " + req.params.psychologist_id)
            id = req.params.psychologist_id;
        }
        res.status(201).json({
            success: true,
            msg: "PATCH USER ID",
            URL: `${req.url}/${id}`
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong. Please try again later." + err
        });
    }
}

//EXTRA

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