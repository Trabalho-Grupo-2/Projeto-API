const db = require("../models/index.js");

//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Patients = db.patients;
const Psychologists = db.psychologists;

exports.postPsychologist = async (req, res) => {

    console.log("POST PSYCHOLOGIST")

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

        return res.status(201).json({
            success: true,
            msg: "New User created.",
            URL: `/psychologist/${id}`
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

exports.getPsychologistById = async function (req, res) {

    console.log("GET PSYCHOLOGIST BY ID")

    try {

        if (!req.body && !req.body.username && !req.body.password)
            return res.status(400).json({
                success: false,
                msg: "Username and password are mandatory"
            });

        let dbPsy = await Psychologists.findById(req.params.psychologist_id).exec();

        res.status(200).json({
            success: true,
            msg: "GET PSYCHOLOGIST ID",
            patient: `${dbPsy}`,
            url: `${req.url}`
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