const verifyUser = require('../middlewares/verifyUser');
const dashboardData = require('../services/dashboardData');
const logout = require('../services/logout');
const express = require('express');
const updateAddData = require('../services/updateAddData');
const getCart = require('../services/getCart');
const removeFromCart = require('../services/removeFromCart');
const updateQuantityData = require('../services/updateQuantityData');
const router = express.Router();

router.post('/dashboard', verifyUser, dashboardData);
router.post('/logout', verifyUser, logout)
router.post('/updateData', verifyUser, updateAddData)
router.post('/cart', verifyUser, getCart)
router.post('/cart/delete', verifyUser, removeFromCart)
router.post('/cart/update', verifyUser, updateQuantityData)

module.exports = router;
