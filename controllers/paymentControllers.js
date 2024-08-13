const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY); // Updated to upper case for environment variable
const { ObjectId } = require('mongodb');
const Cart = require('../models/cartSchema');
const Payment = require('../models/paymentSchema');

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
    try {
        const { price } = req.body;

        // Validate price
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).send({ error: true, message: 'Invalid price value' });
        }

        const amount = price * 100; // Stripe requires amount in cents
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};

// Handle Payment
exports.handlePayment = async (req, res) => {
    try {
        const paymentData = req.body;

        // Save payment to database
        const payment = new Payment(paymentData);
        const result = await payment.save();
        const query = { _id: { $in: paymentData.item.map(id => new ObjectId(id)) } };
        const deleteResult = await Cart.deleteMany(query);

        res.status(201).send({
            success: true,
            message: 'Payment successfully processed',
            result,
            deleteResult
        });
    } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};
