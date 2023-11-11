const verifyUser = require('../middlewares/verifyUser');
const dashboardData = require('../services/dashboardData');
const getNBATeams = require('../services/getNBATeams');
const logout = require('../services/logout');
const express = require('express');
const updateAddData = require('../services/updateAddData');

const router = express.Router();

router.post('/dashboard', verifyUser, dashboardData);
router.post('/logout', verifyUser, logout)
router.post('/updateData', verifyUser, updateAddData)

module.exports = router;
