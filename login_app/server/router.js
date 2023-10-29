const express = require("express");
const router = express.Router();

const User = require("./config");

// npm install validator --save
var validator = require("validator");

//npm install --save lodash
const isEmpty = require("lodash/isEmpty");
// const url = require("url")

const validRegisterInput = (data) => {
    let err = {};
    if (validator.isEmpty(data.username)) {
        err.username = "empty username!"
    }
    if (!validator.isEmail(data.email)) {
        err.email = "invalid email!"
    }
    if (validator.isEmpty(data.password)) {
        err.password = "empty password!"
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
        err.passwordConfirmation = "different passwords!"
    }
    return {
        isValid: isEmpty(err), err
    }
}

const validLoginInput = (data) => {
    
}

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { isValid, err } = validRegisterInput(req.body);
    if (!isValid) {
        console.log(err);
        res.status(400).json(err);
        // res.send(err);
    }
    else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        try {
            const newUser = await User.create(userData);
            console.log(1010, newUser);
            return res.json({ msg: "1010,success" });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email === 1) {
                return res.status(400).json({ email: "Email address is already in use" });
            }
            console.error("Error creating user:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
})

router.get("/find/username", async (req, res) => {
    // const username = url.parse(req.url,true).query.username;
    const username = req.query.username;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (user === null) {
            return res.send({ msg: "unique user", flag: true });
        } else {
            return res.send({ msg: "user exists", flag: false });
        }
    } catch (error) {
        console.log("db error:", error);;
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        // console.log(user,8848);
        if (!user) {
            return res.send({ valid: false, msg: "Invalied username or password" });
        } else {
            return res.send({ valid: true, user });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
})

module.exports = router;

