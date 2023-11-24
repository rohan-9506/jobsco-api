// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/job-listings', jobController.getJobListings);

module.exports = router;
