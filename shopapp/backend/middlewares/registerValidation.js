const { body } = require('express-validator');

const registerValidation = [
    body('nick').isString().notEmpty().trim().escape(),
    body('email').isEmail(),
    body('password')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        console.log('koniec');
        return true;
    }),
];

module.exports = registerValidation;
