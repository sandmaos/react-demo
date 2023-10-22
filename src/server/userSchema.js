const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('db ok'))
    .catch(() => console.log('db failed'))

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    pwd: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
