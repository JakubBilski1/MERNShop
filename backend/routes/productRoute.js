const express = require('express');
const products = require('../services/products');
const getProductsFilters = require('../services/getProductsFilters');
const getId = require('../services/getId');
const getProductByShortName = require('../services/getProductByShortName');

const router = express.Router();

router.post('/', products);

router.post('/query', getProductsFilters);

router.post('/id/:id', getId);

router.post('/p/:shortName', getProductByShortName);

module.exports = router;