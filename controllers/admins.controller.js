const db = require("../models/index.js");

const Admins = db.admins;

exports.postAdmin = async (req, res) => {

    console.log("POST ADMIN")

    try {
        let id

        const admin = new Admins({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        await admin.save()
        
        id = admin._id

        res.status(201).json({
            success: true,
            msg: "New Admin created.",
            URL: `/admin/${id}`
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