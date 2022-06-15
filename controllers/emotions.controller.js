const db = require("../models/index.js");

const Emotions = db.emotions;

exports.postEmotion = async (req, res) => {

    console.log("POST EMOTION")

    try {
        let id

        let emotion = await Emotions.findOne({
            name: req.body.name
        });

        if (emotion != null) {
            return res.status(401).json({
                success: false,
                msgs: "Emotion name already exists"
            })
        }

        if (!req.body && !req.body.name && !req.body.path)
            return res.status(400).json({
                success: false,
                msg: "name and path are mandatory"
            });

        emotion = new Emotions({
            name: req.body.name,
            path: req.body.path
        })

        let newEmotion = await emotion.save()
        id = newEmotion._id

        return res.status(201).json({
            success: true,
            msg: "New Emotion created.",
            URL: `/emotion/${id}`
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

        let dbEmotion = await Emotion.findById(id).exec();

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

exports.patchEmotionById = async (req, res) => {

    console.log("PATCH PATIENT BY ID");

    try {

        const id = req.params.emotion_id

        let dbEmotion = await Emotions.findById(id).exec();

        if (dbEmotion.name != req.body.name) {
            dbEmotion.name = req.body.name
        }

        if (dbEmotion.path != req.body.path) {
            dbEmotion.path = req.body.path
        }

        await Emotions.findByIdAndUpdate(id, dbEmotion, {
            useFindAndModify: false
        }).exec();

        res.status(200).json({
            success: true,
            msg: "PATCH EMOTION ID",
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