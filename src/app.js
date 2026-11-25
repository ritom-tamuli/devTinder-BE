const express = require("express");
const connectDB = require("./config/database");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const app = express();

//middleware for converting req body json to js object
app.use(express.json());

//signup new user
app.post("/signup", async (req, res) => {

    const { firstName, lastName, emailId, password } = req.body;
    try{
        // Validation of data
        validateSignUpData(req);
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        // Creating new instance of the User Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("User Signed up successfully!!");
    } catch (err) {
        res.status(400).send("Error signing up the user: " + err.message);
    }

});

//get user by email
app.get("/user", async (req,res) => {

    const userEmail = req.body.emailId;
    try {
        const user =await User.find({ emailId: userEmail });

        if(user.length === 0) {
            res.status(404).send("User Not Found!")
        } else {
            res.send(user);
        }
    } catch {
        res.status(400).send("Something Went Wrong!")
    }

});

//feed api - get all users
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch {
        res.status(400).send("Something Wend Wrong!")
    }
});

//delete user by id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Someting went wrong!");
    }
});

//update user
app.patch("/user/:userId", async (req,res) => {
    const updateData = req.body;
    const userId = req.params?.userId;
    try {

        //api level DATA Sanitization
        const ALLOWED_UPDATES = ["userId", "password", "skills", "photoUrl", "about", "gender"];
        const isUpdateAllowed = Object.keys(updateData).every((key) => ALLOWED_UPDATES.includes(key));
        if(!isUpdateAllowed){
            throw new Error("Update not Allowed!")
        }

        await User.findByIdAndUpdate(userId, updateData, { runValidators: true });
        res.send("User data updated!");
    } catch (error) {
        res.status(400).send("Something went wrong!" + error );
    }
});


// connecting database first and then start app
connectDB()
    .then(() => {
        console.log("Database Connection Successful...");
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    })
    .catch((err) => {
        console.log("ERROR - Database Connection Failed!!");
    })