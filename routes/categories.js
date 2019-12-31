const express = require('express');
const router = express.Router();

// CONTROLLERS
const categories = require('../controllers/categories');
const add = require('../controllers/addCategory');
const postCategory = require('../controllers/categoryLogic')

// GET CATEGORIES ROUTE
router.get('/', categories);

// GET ADD ROUTE
router.get('/add', add);

// POST ADD LOGIC
router.post('/add', postCategory);

module.exports = router;