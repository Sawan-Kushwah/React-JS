import express from "express"
import mongoose from "mongoose"
const app = express()
const port = 3000
import { signup } from "../backend/model/schema.js"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt";
import 'dotenv/config'
import sendMailToVerify from "./sendMail.js"
import otpGenerator from 'otp-generator'


// middleware
app.use(bodyParser.json())
app.use(cors())

await mongoose.connect(process.env.MONGODB_URL);

app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/login', async (req, res) => {
    try {

        let loginDetails = req.body;
        let userData = await signup.findOne({ email: loginDetails.email });
        if (userData === null) {
            res.status(401).json({ message: "Invalid email or password" });
        } else if (bcrypt.compare(userData.password, loginDetails.password)) {
            console.log("hello");
            res.status(200).json({ userData });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

})

// verifying mail here
// sendMailToVerify(usermailhere);
app.post('/verifyEmail', async (req, res) => {
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });
        let usermail = req.body.verifyEmail;
        console.log(req.body);
        let userAlreadyPresent = await signup.findOne({ email: usermail });

        if (userAlreadyPresent !== null) {
            //user found in data base
            console.log("user found")
            if (req.body.forgetPassword) {
                // request from forget password page
                console.log(usermail + " and otp is -> " + otp);
                sendMailToVerify(usermail, otp);
                res.status(200).json({ otp: otp, message: "OTP send successfully" });
            } else {
                //request from signup page
                res.status(401).json({ message: "User already present , Go to login page" });
            }
        } else {
            //user not found
            console.log("user not found")
            if (req.body.forgetPassword) {
                // request from forget password page
                console.log("user not foud and forget is true")
                res.status(401).json({ message: "User not found" });
            } else {
                //request from signup page
                console.log(usermail + " and otp is -> " + otp);
                sendMailToVerify(usermail, otp);
                res.status(200).json({ otp: otp, message: "OTP send successfully" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// Add the data into database
app.post('/signUp', async (req, res) => {
    try {
        console.log(req.body);
        let signupDetails = req.body;
        await signup.create(signupDetails) //save to database
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }

})

app.post('/resetPassword', async (req, res) => {
    try {
        let newPassword = req.body.password;
        let useremail = req.body.email;
        let hashPass = await bcrypt.hash(newPassword, 10);
        await signup.updateOne({ email: useremail }, { $set: { password: hashPass } });
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})