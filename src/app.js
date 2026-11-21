const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

//middleware for converting req body json to js object
app.use(express.json());

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