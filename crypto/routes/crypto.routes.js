const express = require('express');
const { getStats, getDeviation } = require('../controllers/crypto.controller');

const router = express.Router();

// Route for fetching stats of a coin
router.get('/stats', getStats);

// Route for fetching price deviation of a coin
router.get('/deviation', getDeviation);

module.exports = router;
