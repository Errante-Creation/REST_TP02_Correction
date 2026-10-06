const express = require('express');
const { me } = require('../controllers/authController');
const authenticateBearer = require('../middlewares/authenticateBearer');

const router = express.Router();

// Je ne peux accéder à ce endpoint QUE si mon middleware authenticateBearer m'y autorise
router.get('/me', authenticateBearer, me)

// Upload d'image
// D'accord, je veux bien que tu upload MAIS seulement si tu es connecté
// next → req.user
// multer → destiné à l'upload (on image qu'on créé un middle d'upload avec multer)
// next → req.image
// sharp → permet le greenIT (compression et format webp)
// next → req.image (url, format..)
// controlleur upload
// → Ajouter l'image à la BDD
// → return quelque chose à l'utilisateur
// Si quelque chose se passe mal on gère avec le catch() → envoi sur le middleware de gestion d'erreur globale
// router.post('/upload', authenticateBearer, multer, sharp,  upload)

module.exports = router;