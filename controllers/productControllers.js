const Product = require('../models/productSchema');

// Get products with optional filtering by product_name
const getProducts = async (req, res) => {
    try {
        let query = {};
        if (req.query.product_name) {
            const productNameRegex = new RegExp(req.query.product_name, 'i');
            query.product_name = productNameRegex;
        }
        
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all collections (products)
const getCollections = async (req, res) => {
    try {
        const users = await Product.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
const getCollectionById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    getCollections,
    getCollectionById,
    addProduct,
    deleteProduct
};
