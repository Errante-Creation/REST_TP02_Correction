const express = require('express');
const { me } = require('../controllers/authController');
const authenticateBearer = require('../middlewares/authenticateBearer');

const router = express.Router();

// Je ne peux accéder à ce endpoint QUE si mon middleware authenticateBearer m'y autorise
router.get('/me', authenticateBearer, me)

module.exports = router;