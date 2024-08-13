const express = require('express');
const router = express.Router();
const { verifyJWTToken } = require('../middleware/authMiddleware');
const { createPaymentIntent, handlePayment } = require('../controllers/paymentControllers');


router.post('/create-payment-intent', verifyJWTToken, createPaymentIntent);
router.post('/payments', verifyJWTToken, handlePayment);

module.exports = router;
