const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    quantity: {
        type: Number,
        default: 1
    },
    color: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
