const verifyUser = require('../middlewares/verifyUser');
const dashboardData = require('../services/dashboardData');
const logout = require('../services/logout');
const express = require('express');

const router = express.Router();

router.post('/dashboard', verifyUser, dashboardData);
router.post('/logout', verifyUser, logout)

module.exports = router;
