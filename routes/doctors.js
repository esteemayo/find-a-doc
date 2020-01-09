const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

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

// GET DOCTOR/CATEGORY NAME ROUTE
router.get('/category/:name', category);

// GET ADD ROUTE
router.get('/add', auth, add);

// POST ADD LOGIC
router.post('/add', auth, logic);

module.exports = router;