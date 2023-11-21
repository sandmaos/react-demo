const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy';
const bcrypt = require('bcrypt');

const User = require('./userSchema');
const Card = require('./cardSchema');

const { auth } = require('./utils/auth.js');

// const cardData = require('./cardData');

routes.post('/register', async (req, res) => {
    const { username, pwd } = req.body;
    try {
        const result = await User.findOne({ username });
        if (result !== null)
            return res.json({ duplicate: true, message: 'Duplicate username!' })
        const hashedPwd = await bcrypt.hash(pwd, 5);
        await User.create({ username, pwd: hashedPwd });
        return res.json({ duplicate: false, message: 'Register success!' })
    } catch (err) {
        return res.status(500).json(err);
    }
});

routes.post('/signin', async (req, res) => {
    const { username, pwd } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user === null)
            return res.json({ flag: false, message: 'Wrong username' })
        const pwdMatch = await bcrypt.compare(pwd, user.pwd)
        if (!pwdMatch)
            return res.json({ flag: false, message: 'Wrong password' });
        const token = jwt.sign({ username, pwd: user.pwd }, jwtSecretKey, { expiresIn: '1d' });
        return res.json({ flag: true, message: 'success', token })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

routes.post('/find-user', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user === null)
            return res.json({ isUser: false, message: 'User not found' })
        else {
            const newPwdToken = jwt.sign({ username }, jwtSecretKey, { expiresIn: '10m' });
            return res.json({ findUser: true, token: newPwdToken })
        }

    } catch (err) {
        return res.json({ findUser: false, message: 'Error' })
    }
});

routes.post('/update-pwd', async (req, res) => {
    const { username, password } = req.body;
    const pwd = await bcrypt.hash(password, 5);
    try {
        await User.findOneAndUpdate({ username }, { $set: { pwd } }, { new: true, useFindAndModify: false });
        return res.json({ message: 'update success' })
    } catch (err) {
        return res.json({ message: 'update failed' })
    }
});

//verify to check expire
routes.post('/jwt', (req, res) => {
    const token = req.body.token;
    try {
        const decode = jwt.verify(token, jwtSecretKey)
        const presentTime = Math.floor(Date.now() / 1000);
        if (presentTime < decode.exp)
            return res.status(200).json({ isExpired: false });
    } catch (err) {
        return res.json({ err, isExpired: true });
    }
})

//fetch cards info
routes.post('/cards', async (req, res) => {
    const { sortOption } = req.body;
    const cardData = await Card.find().sort({ id: sortOption });
    try {
        return res.status(200).json({ cardData });
    } catch (err) {
        return res.json({ err });
    }
})

routes.post('/addCard', auth, async (req, res) => {
    const { username } = req.body.userInfo;
    const { type, text } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user === null) {
            return res.json({ msg: 'unauthorized' })
        }
        const id = Date.now();
        await Card.create({ id, type, text });
        return res.json({ msg: 'addCard success' })
    } catch (err) {
        return res.json({ msg: 'addCard failed' })
    }
})

routes.post('/deleteCard', auth, async (req, res) => {
    const { username } = req.body.userInfo;
    const { id } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user === null) {
            return res.json({ msg: 'unauthorized' })
        }
        await Card.deleteOne({ id });
        return res.json({ msg: `Card ${id} deleted` })
    } catch (err) {
        return res.json({ msg: 'Delete failed' })
    }
})

module.exports = routes;