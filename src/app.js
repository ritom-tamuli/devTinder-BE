const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

//middleware for converting req body json to js object
app.use(express.json());

//signup new user
app.post("/signup", async (req, res) => {

    // const user = new User({
    //     firstName: "MS",
    //     lastName: "Dhoni",
    //     email: "dhoni@gmail.com",
    //     password: "dhoni@123"
    // });

    console.log(req.body);

    // creating new instance of the User Model
    const user = new User(req.body);

    try{ 
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
        const user1 = await User
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
app.patch("/user", async (req,res) => {
    const updateData = req.body;
    const userId = req.body.userId;
    try {
        await User.findByIdAndUpdate(userId, updateData);
        res.send("User data updated!")
    } catch (error) {
        res.status(400).send("Something went wrong!");
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