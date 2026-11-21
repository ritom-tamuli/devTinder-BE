const mongoose = require("mongoose");

const connectDB = async () => {

    // connect returns a promise
    await mongoose.connect("mongodb+srv://ritomtamuli321_db_user:7VdB0hkY08l5nPT5@namastenode.z2zlpm5.mongodb.net/devTinder");
};

module.exports = connectDB;