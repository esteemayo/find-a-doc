const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// CONTROLLERS
const categories = require('../controllers/categories');
const add = require('../controllers/addCategory');
const postCategory = require('../controllers/categoryLogic')

// GET CATEGORIES ROUTE
router.get('/', categories);

// GET ADD ROUTE
router.get('/add', auth, add);

// POST ADD LOGIC
router.post('/add', auth, postCategory);

module.exports = router;