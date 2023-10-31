const jwt = require('jsonwebtoken');
const jwtSecretKey = 'jay2zxy';

//only user with Bearer_token can add or delete card
const auth = (req, res, next) => {
    const tokenMatch = req.body.token?.match(/^Bearer_(.+)/);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (!token)
        return res.json({ status: "unauthorized" });
    try {
        const user = jwt.verify(token, jwtSecretKey);
        req.body.userInfo = user;
        next();
    } catch (err) {
        return res.json({ err });
    }
}
module.exports = { auth };