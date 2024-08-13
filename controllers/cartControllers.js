const Cart = require('../models/cartSchema');

exports.getCarts = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send({ error: true, message: 'Email is required' });
        }

        const carts = await Cart.find({ email: email });
        res.send(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};

exports.addCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const result = await cart.save();
        res.status(201).send(result);
    } catch (error) {
        console.error('Error adding cart:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = req.body;
        const result = await Cart.findByIdAndUpdate(id, updatedCart, { new: true });
        res.send(result);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cart.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ error: true, message: 'Cart not found' });
        }
        res.send({ deletedCount: 1 });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
};
