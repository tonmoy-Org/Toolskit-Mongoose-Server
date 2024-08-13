const express = require('express');
const router = express.Router();
const { verifyJWTToken } = require('../middleware/authMiddleware');
const { getCarts, addCart, updateCart, deleteCart } = require('../controllers/cartControllers');

router.get('/shopping-cart', verifyJWTToken, getCarts);
router.post('/carts', verifyJWTToken, addCart);
router.put('/update-carts/:id', verifyJWTToken, updateCart);
router.delete('/delete-carts/:id', verifyJWTToken, deleteCart);

module.exports = router;
