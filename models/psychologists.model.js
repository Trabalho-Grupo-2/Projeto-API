module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        psychologist_id: {
            type: Number,
            Unique: true
        },

        name: {
            type: String,
            required: [true, 'Please a valid username']
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

        patients: {
            type: String,
            required: [false]
        }
    }, {
        timestamps: false
    });

    const Psychologists = mongoose.model("psychologists", schema);
    return Psychologists;
};