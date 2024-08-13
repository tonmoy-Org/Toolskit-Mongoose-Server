const express = require('express');
const { loginUser, getUserProfile } = require('../controllers/authControllers');
const { verifyJWTToken, verifyTokenAndAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', getUserProfile);
router.get('/verify/admin-users/:email', verifyTokenAndAdmin)
router.post('/login', loginUser);

module.exports = router;
