const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy';
const bcrypt = require('bcrypt');

const User = require('./userSchema');
const Card = require('./cardSchema');

// const cardData = require('./cardData');

routes.post('/register', async (req, res) => {
    const { username, pwd } = req.body;
    try {
        const hashedPwd = await bcrypt.hash(pwd, 5);
        await User.create({ username, pwd: hashedPwd });
        return res.send('Success!')
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
        if (pwdMatch) {
            const token = jwt.sign({ username, pwd: user.pwd }, jwtSecretKey, { expiresIn: '1d' });
            return res.json({ flag: true, message: 'success', token })
        }
        else
            return res.json({ flag: false, message: 'Wrong password' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
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

routes.post('/addCard', async (req, res) => {
    const { type, text } = req.body;
    const id = Date.now();
    try {
        const newCard = await Card.create({ id, type, text });
        console.log(newCard);
        return res.json({ msg: 'addCard success' })
    } catch (err) {
        return res.json(err, { msg: 'addCard failed' })
    }
})

routes.post('/deleteCard', async (req, res) => {
    const { id } = req.body;
    try {
        await Card.deleteOne({ id });
        return res.json({ msg: `Card ${id} deleted` })
    } catch (err) {
        return res.json(err, { msg: 'Delete failed' })
    }
})

module.exports = routes;