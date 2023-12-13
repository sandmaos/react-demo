const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes')
const fileRoutes = require('./fileRoutes')
const PORT = 5000;
const DB = 'demo';
const mongoose = require('mongoose');

const process = require("process");
const dotenv = require("dotenv");
dotenv.config();

// mongoose.connect('mongodb://localhost:27017/demo', {
mongoose.connect(`mongodb+srv://${process.env.MDB_NAME}:${process.env.MDB_PWD}@cluster0.vixtgvf.mongodb.net/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('db ok'))
    .catch((err) => console.log(err))


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors()); //must use before /api

// middleware config the CORS headers for file download
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Content-Type, Content-Disposition');  
    next();
});
app.use('/api', routes);
app.use('/api', fileRoutes);


// const cardData=require('./cardData')
// const Card = require('./cardSchema');
// Card.create(cardData);

app.listen(PORT, () => {
    console.log(`Port ${PORT} is listening...`);
});