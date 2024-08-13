const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    product_name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    images: [String],
    email: { 
        type: String, 
        required: true 
    },
    userName: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
