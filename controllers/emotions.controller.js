const db = require("../models/index.js");
const cloudinary = require('../config/cloud.config.js');

const Emotions = db.emotions;

exports.postImage = async (req, res) => {

    console.log("POST IMAGE")

    try {

        if (!req.body && !req.body.name)
            return res.status(400).json({
                success: false,
                msg: "Emotion Missing"
            });

        if (!req.file)
            return res.status(400).json({
                success: false,
                msg: "Image Missing"
            });

        let emotion = await Emotions.findOne({
            name: req.body.name
        });

        if (emotion == null) {
            return res.status(401).json({
                success: false,
                msgs: "Emotion name dosen't exists"
            })
        }

        let user_image = await cloudinary.uploader.upload(req.file.path);

        emotion.pictures.push(user_image.url)

        await Emotions.findByIdAndUpdate(emotion.id, emotion, {
            useFindAndModify: false
        }).exec();


        return res.status(201).json({
            success: true,
            msg: "New Image created.",
            URL: `/emotion/${user_image.public_id}`
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

exports.getEmotionById = async (req, res) => {

    console.log("GET EMOTION BY ID")

    const id = req.params.emotion_id

    try {

        let dbEmotion = await Emotions.findById(id).exec();

        res.status(200).json({
            success: true,
            msg: "GET EMOTION ID",
            patient: `${dbEmotion}`,
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

exports.deleteEmotionById = async (req, res) => {

    console.log("DELETE EMOTION BY ID");

    const id = req.params.emotion_id

    try {

        await Emotions.findByIdAndRemove(id).exec()

        res.status(200).json({
            success: true,
            msg: "DELETE EMOTION ID",
            patient: `${id}`,
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