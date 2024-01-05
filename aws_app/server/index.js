const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');
const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use(cors());
app.use(logger('dev'))

app.get('/api/info', (req, res) => {
    const newUuid = uuidv4();
    res.send(newUuid);
})

app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
})