const getCart = require('../services/getCart');
const removeFromCart = require('../services/removeFromCart');
const updateQuantityData = require('../services/updateQuantityData');
const verifyUser = require('../middlewares/verifyUser');
const express = require('express');
const router = express.Router();

router.post('/cart', verifyUser, getCart)
router.post('/cart/delete', verifyUser, removeFromCart)
router.post('/cart/update', verifyUser, updateQuantityData)

module.exports = router;