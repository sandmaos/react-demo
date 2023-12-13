const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

const { solveSudoku, checkValid } = require('./sudoku.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.post('/api/sudoku', (req, res) => {
    const { data } = req.body;
    if (!checkValid(data))
        res.status(400).send('Invalid board.');
    else {
        solveSudoku(data);
        res.status(200).send(data);
    }
})

app.listen(PORT, () => {
    console.log(`Port ${PORT} is listening`);
})

