const { validationResult } = require('express-validator');

const registerValidation = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => e.msg);

        return res.status(400).json({ errorMessages });
    }

    next();
}

module.exports = registerValidation;