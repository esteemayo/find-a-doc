const express = require('express');
const router = express.Router();

// CONTROLLERS
const forgot = require('../controllers/forgot');
const forgotLogic = require('../controllers/forgotLogic');

// GET FORGOT ROUTER
router.get('/', forgot);

// POST FORGOT LOGIC
router.post('/', forgotLogic);

module.exports = router;