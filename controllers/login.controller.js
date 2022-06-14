const db = require("../models/index.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async(req, res) => {

    console.log("LOGIN")

    return res.status(200).json({
        success: true,
        msg: "Login Sucessfull",
        URL: `/login`
    });


}