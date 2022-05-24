const db = require("../models/index.js");

//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Patients = db.patients;
const Psychologists = db.psychologists;

exports.postPatient = async (req, res) => {

    console.log("POST PATIENT")

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

        return res.status(201).json({
            success: true,
            msg: "New User created.",
            URL: `/patients/${id}`
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