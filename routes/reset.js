const express = require('express');
const router = express.Router();

// CONTROLLERS
const reset = require('../controllers/reset');
const resetLogic = require('../controllers/resetLogic');

// GET RESET PASSWORD ROUTE
router.get('/', reset);

// POST RESET PASSWORD LOGIC
router.post('/', resetLogic);

module.exports = router;