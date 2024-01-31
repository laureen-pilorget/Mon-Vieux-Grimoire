const express = require ('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');

// Création de routes POST car le front enverra des informations (l'email et le mot de passe)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;