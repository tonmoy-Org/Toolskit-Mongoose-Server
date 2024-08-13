// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const { verifyJWTToken, verifyTokenAndAdmin } = require('../middleware/authMiddleware');

router.get('/product', productController.getProducts);
router.get('/collection', productController.getCollections);
router.get('/collection/:id', productController.getCollectionById);
router.post('/products', verifyJWTToken, verifyTokenAndAdmin, productController.addProduct);
router.delete('/delete-product/:id', verifyJWTToken, verifyTokenAndAdmin, productController.deleteProduct);

module.exports = router;
