// jobRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { applyJob } = require('../controllers/applicationController');

const upload = multer(); // You can configure multer as needed

router.post('/api/apply-job/:jobId', upload.single('resume'), applyJob);

module.exports = router;
