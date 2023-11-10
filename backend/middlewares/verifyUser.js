const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                req.user = decoded;
                next();
            }
        })
    }
}

module.exports = verifyUser;