const { body } = require('express-validator');

const registerValidation = [
    body('data.nick').isString().notEmpty().trim().escape(),
    body('data.email').isEmail(),
    body('data.password')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('data.passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.data.password) {
            throw new Error('Password confirmation does not match password.');
        }
        return true;
    }),
];

module.exports = registerValidation;
