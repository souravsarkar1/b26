const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
require('dotenv').config();
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.secrate);
            if (decode) {
                req.body.userID = decode.userID;
                req.body.user = decode.user;
                next();
            } else {
                res.status(200).json({ msg: "Not Authorized" })
            }
        } catch (error) {
            res.status(200).json({ error: error.message });
        }
    } else {
        res.json({ msg: "please Login" })
    }
}

module.exports = { auth };
