const express = require('express');
const { register, login, refresh } = require('../controllers/authController')

const router = express.Router();

// Endpoints 
    // /register
    // /login
    // /refresh
// router.post('/register', middleware de validation zod, register)
router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)

module.exports = router;