const express = require('express');
const router = express.Router();

// CONTROLLERS
const doctors = require('../controllers/doctors');
const details = require('../controllers/details');
const category = require('../controllers/doctorCategory');
const add = require('../controllers/addDoctor');
const logic = require('../controllers/doctorLogic');

// GET DOCTOR ROUTE
router.get('/', doctors);

// GET DETAILS[SHOW] ROUTE
router.get('/details/:id', details);

// GET DOCTOR/CATEOGY NAME ROUTE
router.get('/category/:name', category);

// GET ADD ROUTE
router.get('/add', add);

// POST ADD LOGIC
router.post('/add', logic);

module.exports = router;