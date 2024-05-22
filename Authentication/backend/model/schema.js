import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    address: String
});

export const signup = mongoose.model('signup', signupSchema);