// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    specification: { type: String },
    stock_status: { type: String },
    images: [String],
    colors: [String],
    review: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
