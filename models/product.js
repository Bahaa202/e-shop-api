const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String},
  brand:{type: String},
  description: { type: String},
  price: { type: Number},
  image: { type: String},
  inStock:{type: Number},
  rate:{type: Number, min: 1, max: 5},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
