const express = require('express');
const router = express.Router();
const getNBATeams = require('../services/getNBATeams');

router.post('/nba', getNBATeams);

module.exports = router;