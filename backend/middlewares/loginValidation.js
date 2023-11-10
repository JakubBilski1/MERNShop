const { body } = require('express-validator')

const loginVal = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
]

module.exports = loginVal;