const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    line1: {
        type: String,
        default: ''
    },
    line2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    postal_code: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
});

const billerInfoSchema = new mongoose.Schema({
    address: addressSchema,
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: String
});

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    itemName: [{
        type: String,
        required: true
    }],
    item: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    }],
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethodId: {
        type: String,
        required: true
    },
    billerInfo: {
        type: billerInfoSchema,
        required: true
    },
    shippingAddress: {
        type: addressSchema,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: 'usd'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
