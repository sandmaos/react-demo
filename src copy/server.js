const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy'

const bcrypt = require('bcrypt')

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    pwd: String
})
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('db ok'))
    .catch(() => console.log('db failed'))

// const myDb = mongoose.connection;

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const cardData = [
    {
        "id": 0,
        "type": "Lizard",
        "text": "Information about Lizard: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 1,
        "type": "Hippo",
        "text": "Information about Hippo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 2,
        "type": "Tiger",
        "text": "Information about Tiger: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 3,
        "type": "Dolphin",
        "text": "Information about Dolphin: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 4,
        "type": "Penguin",
        "text": "Information about Penguin: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 5,
        "type": "Zebra",
        "text": "Information about Zebra: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 6,
        "type": "Penguin",
        "text": "Information about Penguin: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 7,
        "type": "Kangaroo",
        "text": "Information about Kangaroo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 8,
        "type": "Tiger",
        "text": "Information about Tiger: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 9,
        "type": "Koala",
        "text": "Information about Koala: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 10,
        "type": "Giraffe",
        "text": "Information about Giraffe: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 11,
        "type": "Tiger",
        "text": "Information about Tiger: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 12,
        "type": "Giraffe",
        "text": "Information about Giraffe: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 13,
        "type": "Lizard",
        "text": "Information about Lizard: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 14,
        "type": "Koala",
        "text": "Information about Koala: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 15,
        "type": "Koala",
        "text": "Information about Koala: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 16,
        "type": "Hippo",
        "text": "Information about Hippo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 17,
        "type": "Tiger",
        "text": "Information about Tiger: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 18,
        "type": "Hippo",
        "text": "Information about Hippo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 19,
        "type": "Zebra",
        "text": "Information about Zebra: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 20,
        "type": "Giraffe",
        "text": "Information about Giraffe: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "id": 21,
        "type": "Hippo",
        "text": "Information about Hippo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
];

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