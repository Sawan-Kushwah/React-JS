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
        // console.log(loginDetails.email);
        let userData = await signup.findOne({ email: loginDetails.email });
        // console.log(userData);
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
const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });
app.post('/verifyEmail', (req, res) => {
    try {
        let usermail = req.body.verifyEmail;
        console.log(usermail + " and otp is -> " + otp);
        sendMailToVerify(usermail, otp);
        res.status(200).json({ otp: otp, message: "OTP send successfully" });
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
        await signup.create(signupDetails)
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})