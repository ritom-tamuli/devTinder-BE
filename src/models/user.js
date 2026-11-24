const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    gender: {
        type: String,
        validate(val) {
            if(!["male", "female", "others"].includes(val))
                throw Error("Invalid gender input");
        }
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "This is default string."
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;