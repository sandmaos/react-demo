const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes')
const PORT = 5000;
const DB='demo';
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://jay:jay2zxy@cluster0.vixtgvf.mongodb.net/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('db ok'))
    .catch((err) => console.log(err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors()); //must use before /api
app.use('/api', routes);


// const cardData=require('./cardData')
// const Card = require('./cardSchema');
// Card.create(cardData);

app.listen(PORT, () => {
    console.log(`Port ${PORT} is listening...`);
});