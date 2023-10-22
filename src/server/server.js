const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy';
const bcrypt = require('bcrypt');

const User = require('./userSchema')

const cardData = require('./cardData');
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, pwd } = req.body;
    try {
        const hashedPwd = await bcrypt.hash(pwd, 5);
        await User.create({ username, pwd: hashedPwd });
        return res.send('Success!')
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.post('/signin', async (req, res) => {
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
app.post('/jwt', (req, res) => {
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
app.get('/cards', (req, res) => {
    try {
        return res.status(200).json({ cardData });
    } catch (err) {
        return res.json({ err });
    }
})

app.listen(PORT, () => {
    console.log(`Port ${PORT} is listening...`);
});