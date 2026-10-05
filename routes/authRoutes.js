const express = require('express');
const { register } = require('../controllers/authController')

const router = express.Router();

// Endpoints 
    // /register
    // /login
    // /refresh
// router.post('/register', middleware de validation zod, register)
router.post('/register', register)

module.exports = router;