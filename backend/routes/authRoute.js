const express = require("express")
const login = require("../services/login")
const register = require("../services/register")
const registerValidation = require("../middlewares/registerValidation")
const registerValRules = require("../middlewares/registerValRules")
const router = express.Router()

router.post('/register', registerValRules, registerValidation, register);
router.post('/login', login);

module.exports = router;