const verifyUser = require('../middlewares/verifyUser');
const dashboardData = require('../services/dashboardData');
const express = require('express');

const router = express.Router();

router.get('/dashboard', verifyUser, dashboardData);