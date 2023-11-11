const express = require("express")
const login = require("../services/login")
const register = require("../services/register")
const loginValidation = require("../middlewares/loginValidation")
const registerValidation = require("../middlewares/registerValidation")
const router = express.Router()

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;