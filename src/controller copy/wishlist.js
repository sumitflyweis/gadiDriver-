const Wishlist = require('../model/wishlist');

// Create a wishlist item
exports.createWishlistItem = async (req, res) => {
  try {
    const { driverId, jobServiceId } = req.body;
    const newWishlistItem = new Wishlist({ driverId, jobServiceId });
    const savedWishlistItem = await newWishlistItem.save();
    res.status(200).json(savedWishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create wishlist item', error });
  }
};

// Get all wishlist items
exports.getAllWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.status(200).json({msg:wishlistItems});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist items', error });
  }
};

// Get wishlist item by ID
exports.getWishlistItemById = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json({msg:wishlistItem});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist item', error });
  }
};

// Update wishlist item by ID
exports.updateWishlistItemById = async (req, res) => {
  try {
    const { driverId, jobServiceId } = req.body;
    const updatedWishlistItem = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { driverId, jobServiceId },
      { new: true }
    );
    if (!updatedWishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json(updatedWishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update wishlist item', error });
  }
};

// Delete wishlist item by ID
exports.deleteWishlistItemById = async (req, res) => {
  try {
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json({ message: 'Wishlist item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete wishlist item', error });
  }
};
