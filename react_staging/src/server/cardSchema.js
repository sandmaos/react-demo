const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    type: String,
    text: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
