module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        patient_id: {
            type: Number,
            Unique: true
        },

        name: {
            type: String,
            required: [true, 'What is your name?']
        },

        description: {
            type: String,
            required: [false]
        },

        email: {
            type: String,
            required: [true, 'What is your email?']
        },

        password: {
            type: String,
            required: [true, 'What is your password?']
        },

        avatar: {
            type: String,
            required: [false]
        },
        emotionsgame1: {
            emotion_id: {
                type: Number,
                Unique: true
            },
            name: {
                type: String,
                required: false
            },
            right_answers: {
                type: Number,
                required: false
            },
            wrong_answers: {
                type: Number,
                required: false
            }
        },
        emotionsgame2: {
            emotion_id: {
                type: Number,
                Unique: true
            },
            name: {
                type: String,
                required: false
            },
            right_answers: {
                type: Number,
                required: false
            },
            wrong_answers: {
                type: Number,
                required: false
            }
        }
    });
    const Patients = mongoose.model("patients", schema);
    return Patients;
};