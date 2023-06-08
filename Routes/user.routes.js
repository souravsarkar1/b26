const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { UserModel } = require('../Model/user.model');
const { registerCheck } = require('../MiddleWare/passwordStrongOrNot.middleWare');
const userRoutes = express.Router();

userRoutes.post('/register', registerCheck, async (req, res) => {
    //logic
    const { name, email, pass } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(200).json({ msg: "A User Is Already Register With This Email ID" })
        } else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.status(200).json({ err: err.message })
                } else {
                    const user = new UserModel({ name, email, pass: hash });
                    user.save();
                    res.status(200).json({ msg: "New User Is Added " })
                }
            });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

userRoutes.post('/login', async (req, res) => {
    //logic
    const { pass, email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(pass, user.pass, async (err, result) => {
            const token = jwt.sign({ userID : user._id , user : user.name }, process.env.secrate);
            if (result) {
                res.status(200).json({ msg: "Login Successful!!", token: token });
            }
            else {
                res.status(200).json({ msg: "Wrong Crendintial" });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = { userRoutes };