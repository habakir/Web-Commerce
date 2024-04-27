const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: `${__dirname}/../.env` });

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.status(401).json("token not sent");

    const token = authHeader.split(' ')[1];

    if (token == null) return res.status(401).json("could not parse token");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: err });
        req.user = user;
        next();
    });
}

module.exports = authToken