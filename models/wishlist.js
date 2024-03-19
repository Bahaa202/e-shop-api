const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Wishlist'
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    },
    favorite: {
      type: Boolean,
      default: false
    },
    note: {
      type: String,
      default: ''
    }
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
