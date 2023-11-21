const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy';

//only user with Bearer_token can add or delete card
const auth = (req, res, next) => {
    const tokenMatch = req.headers.token?.match(/^Bearer_(.+)/);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (!token){
        return res.status(401).json({ success: false, message: 'Unauthorized access. Please log in.' });
    }
    try {
        const user = jwt.verify(token, jwtSecretKey);
        req.body.userInfo = user;
        next();
    } catch (err) {
        return res.json({ err });
    }
}
module.exports = { auth };