const express = require('express');
const { register, login, refresh } = require('../controllers/authController')
const validate = require('../middlewares/validateRequest');
const { registerSchema, loginSchema, refreshSchema } = require('../schemas/authSchemas');

const router = express.Router();

// Endpoints 
    // /register
    // /login
    // /refresh
// router.post('/register', middleware de validation zod, register)
// Register → email, password, name
router.post('/register', validate(registerSchema), register)
// Login → email, password
router.post('/login', validate(loginSchema), login)
// Refresh → token
router.post('/refresh', validate(refreshSchema), refresh)

module.exports = router;