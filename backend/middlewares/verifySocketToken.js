const jwt = require('jsonwebtoken');

const verifySocketToken = (token) => {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
}

module.exports = verifySocketToken;