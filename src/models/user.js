const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error("Invalid email address " + val );
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        validate(val) {
            if(!validator.isStrongPassword(val)) {
                throw new Error("Enter a strong password");
            }
        }
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
        default: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
        validate(val) {
            if(!validator.isURL) {
                throw new Error("Invalid URL");
            }
        }
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