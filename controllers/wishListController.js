const WishList = require('../models/wishListSchema');

// Get all wish list items
const getWishList = async (req, res) => {
    try {
        const result = await WishList.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new item to the wish list
const addToWishList = async (req, res) => {
    const wishListItem = new WishList(req.body);

    try {
        const result = await wishListItem.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an item from the wish list
const deleteFromWishList = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await WishList.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWishList,
    addToWishList,
    deleteFromWishList,
};
