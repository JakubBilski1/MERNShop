const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = userData;
        next();
    }
}

module.exports = verifyUser;