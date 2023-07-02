const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlist');

// Create a wishlist item
router.post('/', wishlistController.createWishlistItem);

// Get all wishlist items
router.get('/', wishlistController.getAllWishlistItems);

// Get wishlist item by ID
router.get('/:id', wishlistController.getWishlistItemById);

// Update wishlist item by ID
router.put('/:id', wishlistController.updateWishlistItemById);

// Delete wishlist item by ID
router.delete('/:id', wishlistController.deleteWishlistItemById);

module.exports = router;
