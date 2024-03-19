const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type: String},
    image: {type: String},
    description: String,
    createdAt: {type: Date, default: Date.now}
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;