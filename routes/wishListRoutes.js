const express = require('express');
const router = express.Router();
const {
    getWishList,
    addToWishList,
    deleteFromWishList,
} = require('../controllers/wishListController');

router.get('/wishList', getWishList);
router.post('/wish-List', addToWishList);
router.delete('/delete-product/wishList/:id', deleteFromWishList);

module.exports = router;
