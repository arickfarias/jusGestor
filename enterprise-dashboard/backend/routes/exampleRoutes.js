// routes/exampleRoutes.js

const express = require('express');
const router = express.Router();
const { getExample, postExample } = require('../controllers/exampleController');

// Define routes
router.get('/', getExample);          // GET /example
router.post('/', postExample);        // POST /example

module.exports = router;